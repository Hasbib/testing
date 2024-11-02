<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import NavbarAdmin from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
import ButtonTransparanComponen from '@/components/ButtonTransparanComponen.vue';
import ButtonMerah from '@/components/ButtonMerah.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const isSidebarVisible = ref(true);
import { SkillData } from '@/data/index.js';

const checkWindowSize = () => {
    isSidebarVisible.value = window.innerWidth >= 770;
};

onMounted(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkWindowSize);
})

const categoryData = ref([]);
const skillsData = ref([]);
const router = useRouter();
const searchQuery = ref('');
const isModalVisible = ref(false);
const isEditModalVisible = ref(false);
const currentSkills = ref(null);
const isDeleteModalVisible = ref(false);
const skillsToDelete = ref(null);
const isToastVisible = ref(false);
const selectedSort = ref('Sort');
const toastMessage = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));

const form = ref({
    name: '',
    id_category: '',
});

const filteredData = computed(() => {
    let sortedData = [...skillsData.value];
    if (selectedSort.value === 'newest') {
        sortedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (selectedSort.value === 'oldest') {
        sortedData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    return sortedData.filter(skills =>
        skills.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// const paginatedData = computed(() => {
//     const startIndex = (currentPage.value - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return filteredData.value.slice(startIndex, endIndex);
// });

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
const pageNumbers = computed(() => {
    const pages = [];
    if (totalPages.value <= 5) {
        for (let i = 1; i <= totalPages.value; i++) pages.push(i);
    } else {
        if (currentPage.value <= 3) {
            pages.push(1, 2, 3, '...', totalPages.value);
        } else if (currentPage.value > 3 && currentPage.value < totalPages.value - 2) {
            pages.push(1, '...', currentPage.value, '...', totalPages.value);
        } else {
            pages.push(1, '...', totalPages.value - 2, totalPages.value - 1, totalPages.value);
        }
    }
    return pages;
});

const fetchCategoryData = async () => {
    try {
        const response = await axios.get('/categories');
        categoryData.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const fetchSkillsData = async () => {
    try {
        const response = await axios.get('/skills');
        skillsData.value = response.data;
    } catch (error) {
        console.error('Error fetching About Us data:', error);
    }
};

const submitSkillForm = async () => {
    try {
        const response = await axios.post('/skills', form.value);
        console.log(response.data.message);
        closeAddSkillsModal();
        showToast('Add Skills successfully!');

        form.value.name = '';
        form.value.id_category = '';
        await fetchSkillsData();

        router.push('/master-data/skills');
    } catch (error) {
        console.error('Error adding skill:', error);
    }
};

const showAddSkillsModal = () => {
    isModalVisible.value = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeAddSkillsModal = () => {
    isModalVisible.value = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const saveUpdateSkills = async () => {
    try {
        if (currentSkills.value) {
            await axios.post(`/skills/${currentSkills.value.id_skill}`, {
                name: currentSkills.value.name,
                id_category: currentSkills.value.id_category,
            });
            fetchSkillsData();
            closeEditCategoryModal();
            showToast('Updated Skills successfully!');
        }
    } catch (error) {
        console.error('Error updating category:', error);
        showToast('Error Updated Category.');
    }
};

const showEditCategoryModal = (skills) => {
    currentSkills.value = { ...skills };
    isEditModalVisible.value = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeEditCategoryModal = () => {
    isEditModalVisible.value = false;
    currentSkills.value = null;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const showDeleteSkillsModal = (skills) => {
    skillsToDelete.value = skills;
    isDeleteModalVisible.value = true;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
};

const closeDeleteSkillsModal = () => {
    isDeleteModalVisible.value = false;
    skillsToDelete.value = null;

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

const deleteSkills = async () => {
    try {
        if (skillsToDelete.value) {
            await axios.delete(`/skills/${skillsToDelete.value.id_skill}`);
            fetchSkillsData();
            closeModal();
            showToast('Skills deleted successfully!');
        }
    } catch (error) {
        console.error('Error deleting category:', error);
    }
};

const showToast = (message) => {
    toastMessage.value = message;
    isToastVisible.value = true;
    setTimeout(() => {
        isToastVisible.value = false;
    }, 3000);
};

const closeModal = () => {
    isDeleteModalVisible.value = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
};

onMounted(() => {
    fetchCategoryData();
    fetchSkillsData();
});
</script>

<template>
    <div class="navbg-sa">
        <!-- NAVBAR START -->
        <NavbarAdmin />
        <!-- NAVBAR END -->

        <!-- SIDEBAR START -->
        <SidebarSA v-if="isSidebarVisible" />
        <!-- SIDEBAR END -->

        <div id="contentsa" class="dashboard-sa">
            <div class="container mt-80">
                <div class="row">
                    <div class="d-flex justify-content-between mb-3">
                        <div class="d-flex justify-content-start">
                            <div class="search-input w-50 me-md-1">
                                <input type="text" class="form-control c-border rounded-3 h-40" v-model="searchQuery"
                                    placeholder="Search" />
                                <i class="bi bi-search"></i>
                            </div>
                            <select class="form-select w-30 c-border h-40 ms-2" v-model="selectedSort">
                                <option selected>Sort</option>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>
                        <ButtonBiru class="fs-16 px-3 rounded-3 h-43" @click="showAddSkillsModal">Add Skill
                        </ButtonBiru>
                    </div>

                    <!-- Add Modal -->
                    <div v-if="isModalVisible" class="modal-backdrop" @click="closeAddSkillsModal"></div>
                    <div v-if="isModalVisible" class="modal fade show d-block" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true" @click.self="closeAddSkillsModal">
                        <div class="modal-dialog custom-modal modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header mb--3">
                                    <h5 class="fs-16 fw-medium" id="exampleModalLabel">
                                        <i class="bi bi-file-earmark-plus me-1"></i>Add Skill
                                    </h5>
                                    <button type="button" class="btn-close fs-12 c-close"
                                        @click="closeAddSkillsModal"></button>
                                </div>
                                <hr class="mt-0">
                                <div class="ps-3 pe-4 mt-3 mb-2">
                                    <div class="d-flex align-items-center">
                                        <label for="categoryName" class="me-3 fs-16 mb-0">Name Category</label>
                                        <select id="categorySelect" class="form-select h-43 w-66 c-border ms-2"
                                            v-model="form.id_category">
                                            <option disabled value="">Select Category</option>
                                            <option v-for="category in categoryData" :key="category.id_category"
                                                :value="category.id_category">
                                                {{ category.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="d-flex align-items-center mt-3">
                                        <label for="categoryName" class="me-5 fs-16 mb-0">Name Skill</label>
                                        <input type="text" id="categoryName"
                                            class="form-control c-border w-66 h-43 ms-4" placeholder="Enter skill name"
                                            v-model="form.name" />
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center mb-5">
                                    <ButtonTransparanComponen
                                        class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16"
                                        @click="closeAddSkillsModal">Cancel</ButtonTransparanComponen>
                                    <ButtonBiru class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16"
                                        @click="submitSkillForm">Save</ButtonBiru>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-4 mt-md-0">
                        <div class="table-responsive">
                            <table class="table custom-table rounded-4">
                                <thead class="thead-custom">
                                    <tr class="ps-4">
                                        <th class="ps-3 fs-16 fw-light w-1">No</th>
                                        <th class="fs-16 fw-light w-750">Category Name</th>
                                        <th class="fs-16 fw-light w-750">Skill Name</th>
                                        <th class="ps-4 fs-16 fw-light w-10">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="table-custom">
                                    <tr v-for="(item, index) in SkillData" :key="item.id">
                                        <td class="ps-4">{{ index + 1 }}</td>
                                        <td>{{ item.category ? item.category : 'No Category' }}</td>
                                        <td>{{ item.skill }}</td>
                                        <td class="ps-4">
                                            <div class="dropdown ps-2">
                                                <button class="btn border-0 dropdown-toggle" type="button"
                                                    data-bs-toggle="dropdown">
                                                    <p class="bi bi-three-dots-vertical"
                                                        style="margin-bottom: -8px; margin-top: -5px;"></p>
                                                </button>
                                                <ul class="dropdown-menu border-0">
                                                    <h5 class="ms-3 fs-16 fw-normal">Action</h5>
                                                    <li>
                                                        <a class="dropdown-item fw-normal fs-16" href="#"
                                                            @click="showEditCategoryModal(item)">
                                                            <i class="bi bi-pencil-square me-1 fs-16"></i>
                                                            Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item fw-normal" href="#"
                                                            @click="showDeleteSkillsModal(item)">
                                                            <i class="bi bi-trash me-1 fs-16"></i>
                                                            Delete
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="p-1">
                                            <nav>
                                                <div class="d-flex justify-content-between">
                                                    <div class="d-flex align-items-center">
                                                        <label for="itemsPerPage" class="me-2">Items per page:</label>
                                                        <select id="itemsPerPage"
                                                            class="form-select w-auto bg-none border-0"
                                                            v-model="itemsPerPage">
                                                            <option value="10">10</option>
                                                            <option value="20">20</option>
                                                            <option value="50">50</option>
                                                        </select>
                                                        <span class="fs-16">{{ (currentPage - 1) * itemsPerPage + 1 }} -
                                                            {{
                                                                Math.min(currentPage * itemsPerPage, filteredData.length) }}
                                                            of
                                                            {{ filteredData.length }} items</span>
                                                    </div>
                                                    <ul class="pagination custom-pagination justify-content-end">
                                                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                                            <a class="page-link" href="#"
                                                                @click.prevent="goToPage(currentPage - 1)">
                                                                <i class="bi bi-chevron-left"></i>
                                                            </a>
                                                        </li>
                                                        <li v-for="page in pageNumbers" :key="page" class="page-item"
                                                            :class="{ active: page === currentPage }">
                                                            <a class="page-link" href="#"
                                                                @click.prevent="goToPage(page)" v-if="page !== '...'">{{
                                                                    page }}</a>
                                                            <span class="page-link" v-else>...</span>
                                                        </li>
                                                        <li class="page-item"
                                                            :class="{ disabled: currentPage === totalPages }">
                                                            <a class="page-link" href="#"
                                                                @click.prevent="goToPage(currentPage + 1)">
                                                                <i class="bi bi-chevron-right"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </nav>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- Edit Modal -->
                            <div v-if="isEditModalVisible" class="modal-backdrop" @click="closeEditCategoryModal"></div>
                            <div v-if="isEditModalVisible" class="modal fade show d-block" role="dialog"
                                aria-labelledby="exampleModalLabel" aria-hidden="false"
                                @click.self="closeEditCategoryModal">
                                <div class="modal-dialog custom-modal modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header mb--3">
                                            <h5 class="fs-16" id="exampleModalLabel">
                                                <i class="bi bi-pencil-square me-1"></i>Edit Skill
                                            </h5>
                                            <button type="button" class="btn-close fs-12 c-close"
                                                @click="closeEditCategoryModal"></button>
                                        </div>
                                        <hr class="mt-0">
                                        <div class="ps-3 pe-3 mt-3 mb-2">
                                            <div class="d-flex align-items-center">
                                                <label for="categoryName" class="me-3 fs-16 mb-0">Name Category</label>
                                                <select id="categorySelect" class="form-select h-43 w-66 c-border ms-2"
                                                    v-model="currentSkills.id_category">
                                                    <option disabled value="">Select Category</option>
                                                    <option v-for="category in categoryData" :key="category.id_category"
                                                        :value="category.id_category">
                                                        {{ category.name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="d-flex align-items-center mt-3">
                                                <label for="categoryName" class="me-5 fs-16 mb-0">Name Skill</label>
                                                <input type="text" id="categoryName"
                                                    class="form-control c-border w-66 h-43 ms-4"
                                                    v-model="currentSkills.name">
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-center mb-5">
                                            <ButtonTransparanComponen
                                                class="mt-4 my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16"
                                                @click="closeEditCategoryModal">Cancel</ButtonTransparanComponen>
                                            <ButtonBiru class="ms-3 mt-4 my-0 h-40 w-30 rounded-3 fs-16"
                                                @click="saveUpdateSkills">Save</ButtonBiru>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Delete Modal -->
                            <div v-if="isDeleteModalVisible" class="modal-backdrop" @click="closeDeleteSkillsModal">
                            </div>
                            <div v-if="isDeleteModalVisible" class="modal fade show d-block" role="dialog"
                                aria-labelledby="deleteModalLabel" aria-hidden="true"
                                @click.self="closeDeleteSkillsModal">
                                <div class="modal-dialog custom-modal modal-dialog-centered">
                                    <div class="modal-content pt-3">
                                        <div
                                            class="modal-header mb-3 d-flex flex-column justify-content-center align-items-center text-center">
                                            <PhTrashSimple :size="50" color="#ff4c4c" />
                                            <h5 class="mb-4 mt-3 fs-16 fw-medium text-merah">Delete Data Skills</h5>
                                            <h5 class="fs-16 fw-light opacity-50">
                                                Are you sure you want to delete this skills? Once deleted, this data
                                                cannot be restored.
                                            </h5>
                                        </div>
                                        <div class="d-flex justify-content-center mb-5">
                                            <ButtonTransparanComponen
                                                class="my-0 h-40 w-30 me-5 rounded-3 c-border bg-white fs-16"
                                                @click="closeDeleteSkillsModal">No, Cancel</ButtonTransparanComponen>
                                            <ButtonMerah class="ms-3 my-0 h-40 w-30 rounded-3 fs-16"
                                                @click="deleteSkills">Yes, Delete</ButtonMerah>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div aria-live="polite" aria-atomic="true" class="position-fixed bs-toast">
                                <div v-if="isToastVisible"
                                    class="toast align-items-center text-white bg-light-success border-0 show"
                                    role="alert">
                                    <div class="d-flex">
                                        <div class="toast-body">
                                            {{ toastMessage }}
                                        </div>
                                        <button type="button" class="btn-close btn-close-white me-2 m-auto"
                                            @click="closeToast" aria-label="Close"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>