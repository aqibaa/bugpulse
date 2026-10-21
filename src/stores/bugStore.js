
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./authStore";



export const useBugStore = defineStore('pinia', () => {


    const authStore = useAuthStore()

    const getCurrentFormattedDate = () => {
        const now = new Date()
        return now.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }



    const saveBugs = localStorage.getItem('bugpulse_bugs')
    const bugs = ref(saveBugs ? JSON.parse(saveBugs) : [])

    const syncStorage = () => {
        localStorage.setItem('bugpulse_bugs', JSON.stringify(bugs.value)) || []
    }

    const searchQuery = ref('')
    const selectedStatus = ref('All')
    const selectedPriority = ref('All')
    const selectedAssign = ref('All')
    const currentView = ref('table')


    const isFormModalOpen = ref(false)
    const editingbug = ref(null)


    const isDetailDrawerOpen = ref(false)
    const selectedBugDetail = ref(null)

    const isDeleteModalOpen = ref(false)
    const bugToDelete = ref(null)


    const stats = computed(() => {
        return {
            total: bugs.value.length,
            newbugs: bugs.value.filter(b => b.status === 'New').length,
            inProgress: bugs.value.filter(b => b.status === 'In Progress').length,
            resolved: bugs.value.filter(b => b.status === 'Resolved').length,
            closed: bugs.value.filter(b => b.status === 'Closed').length
        }
    })


    const filterBugs = computed(() => {
        let result = bugs.value

        if (searchQuery.value.trim() !== '') {
            const query = searchQuery.value.toLowerCase()
            result = result.filter(bug =>
                bug.title.toLowerCase().includes(query) ||
                bug.id.toLowerCase().includes(query)
            )
        }

        if (selectedStatus.value !== 'All') {
            result = result.filter(bug => bug.status === selectedStatus.value)
        }

        if (selectedPriority.value !== 'All') {
            result = result.filter(bug => bug.priority === selectedPriority.value)
        }

        if (selectedAssign.value !== 'All') {
            result = result.filter(bug => bug.assignee?.email === selectedAssign.value)
        }

        return result
    })




    function openCreateModal() {
        editingbug.value = null
        isFormModalOpen.value = true
    }

    function openEditModal(bug) {
        editingbug.value = { ...bug }
        isFormModalOpen.value = true
    }

    function closeFormModal() {
        isFormModalOpen.value = false
        editingbug.value = null
    }

    function openBugDetail(bug) {
        selectedBugDetail.value = bugs.value.find(b => b.id === bug.id) || bug
        isDetailDrawerOpen.value = true
    }

    function closeBugDetail() {
        isDetailDrawerOpen.value = false
        selectedBugDetail.value = null
    }



    function openDeleteModal(id) {
        bugToDelete.value = id
        isDeleteModalOpen.value = true
    }

    function closeDeleteModal() {
        isDeleteModalOpen.value = false
        bugToDelete.value = null
    }

    function confirmDelete() {
        if (selectedBugDetail.value?.id === bugToDelete.value) {
            closeBugDetail()
        }
        bugs.value = bugs.value.filter(b => b.id !== bugToDelete.value)
        syncStorage()
        closeDeleteModal()
    }


    function saveBug(formData) {
        if (editingbug.value) {
            bugs.value = bugs.value.map(bug =>
                bug.id === editingbug.value.id
                    ? { ...bug, ...formData }
                    : bug
            );

            if (selectedBugDetail.value?.id === editingbug.value.id) {
                const updatedBug = bugs.value.find(b => b.id === editingbug.value.id)
                selectedBugDetail.value = { ...updatedBug }
            }
        }

        else {

            const nextId = `BUG-${Math.floor(100 + Math.random() * 900)}`
            const newBug = {
                id: nextId,
                ...formData,
                status: 'New',
                createdDate: getCurrentFormattedDate(),
                comments: []
            }
            bugs.value.unshift(newBug)
        }
        syncStorage()
        closeFormModal()
    }


    function updateBugStatus(id, newStatus) {

        const bug = bugs.value.find(b => b.id === id)
        if (bug) {
            bug.status = newStatus
            syncStorage()
        }
    }


    function addComment(bugId, text) {
        if (!text || !text.trim()) return;

        const bug = bugs.value.find(b => b.id === bugId)
        if (!bug) return
        if (!bug.comments) {
            bug.comments = []
        }

        const currentUserName = authStore.loggedInUser?.name || "Guest"
        const initials = currentUserName
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);



        if (bug) {
            bug.comments.push({
                id: Date.now(),
                author: currentUserName,
                initials,
                text: text.trim(),
                createdAt: getCurrentFormattedDate()
            })

            if (selectedBugDetail.value && selectedBugDetail.value.id === bugId) {
                selectedBugDetail.value.comments = bug.comments
            }
            syncStorage()
        }
    }


    function clearFilters() {
        searchQuery.value = ''
        selectedAssign.value = 'All'
        selectedPriority.value = 'All'
        selectedStatus.value = 'All'
    }

    return {
        bugs,
        selectedAssign,
        searchQuery,
        selectedPriority,
        selectedStatus,
        currentView,
        stats,
        filterBugs,
        saveBug,
        clearFilters,
        addComment,
        updateBugStatus,
        editingbug,
        openCreateModal,
        openEditModal,
        isFormModalOpen,
        saveBug,
        saveBugs,
        closeFormModal, getCurrentFormattedDate,
        selectedBugDetail, closeBugDetail,
        isDetailDrawerOpen, openBugDetail,
        isDeleteModalOpen,
        bugToDelete,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
    }

})

