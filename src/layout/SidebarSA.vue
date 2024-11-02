<template>
    <div id="sidebarsa" class="sd sidebar-sa" :class="['side', { collapsed }]" ref="sidebar">
        <ul>
            <li class="menu-header">
                <span class="menu-logo-sa">Menu</span>
                <button id="toggle-btn" class="btn btn-primary" ref="toggleBtn">
                    <span class="toggle">&#9776;</span>
                </button>
            </li>
            <li class="mt-12">
                <router-link to="/dashboard-superadmin"
                    :class="['nav-link fs-16 bi bi-house-door-fill ps-4', isActive('/dashboard-superadmin') ? 'active-sidebar' : 'color-sidebar']">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">Dashboard</span>
                </router-link>
            </li>
            <li>
                <router-link to="/course-manajemen"
                    :class="['nav-link fs-16 bi bi-book ps-4', isActive('/course-manajemen') ? 'active-sidebar' : 'color-sidebar']">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">Course Management</span>
                </router-link>
            </li>
            <li class="ms-24">
                <a href="#" @click.prevent="toggleUserManagementDropdown"
                    class="nav-link bi bi-people-fill color-sidebar">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">User Management</span>
                    <span class="bi text mt-2 p-absolute r-13"
                        :class="isUserManagementDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'"></span>
                </a>
                <ul v-show="isUserManagementDropdownOpen" class="dropdown mt--3">
                    <li class="ms-18">
                        <router-link to="/user-manajemen/user"
                            :class="['nav-link', isActive('/user-manajemen/user') ? 'active-sidebar' : 'color-sidebar']">
                            <span class="icon"></span>
                            <span class="mt-2 text p-absolute">--</span>
                        </router-link>
                    </li>
                    <li class="ms-18">
                        <router-link to="/user-manajemen/teacher"
                            :class="['nav-link', isActive('/user-manajemen/teacher') ? 'active-sidebar' : 'color-sidebar']">
                            <span class="icon"></span>
                            <span class="mt-2 text p-absolute">--</span>
                        </router-link>
                    </li>
                    <li class="ms-18">
                        <router-link to="/user-manajemen/student"
                            :class="['nav-link', isActive('/user-manajemen/student') ? 'active-sidebar' : 'color-sidebar']">
                            <span class="icon"></span>
                            <span class="mt-2 text p-absolute">--</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" @click.prevent="toggleCMSDropdown"
                    :class="['nav-link bi bi-file-earmark-plus-fill color-sidebar ps-4', { 'active-sidebar': isCMSActive }]">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">CMS</span>
                    <span class="bi text mt-2 p-absolute r-13"
                        :class="isUserCMSDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'"></span>
                </a>
                <ul v-show="isUserCMSDropdownOpen" class="dropdown mt--3">
                    <li class="ms-18">
                        <router-link to="/cms/sponsor"
                            :class="['nav-link', isActive('/cms/sponsor') ? 'active-sidebar2' : 'color-sidebar2']">
                            <span class="icon"></span>
                            <span class="ms-4 mt-2 text p-absolute">Sponsor</span>
                        </router-link>
                    </li>
                    <li class="ms-18">
                        <router-link to="/cms/media-partner"
                            :class="['nav-link', isActive('/cms/media-partner') ? 'active-sidebar2' : 'color-sidebar2']">
                            <span class="icon"></span>
                            <span class="ms-4 mt-2 text p-absolute">Media Partner</span>
                        </router-link>
                    </li>
                    <li class="ms-18">
                        <router-link to="/cms/sosial-media"
                            :class="['nav-link', isActive('/cms/sosial-media') ? 'active-sidebar2' : 'color-sidebar2']">
                            <span class="icon"></span>
                            <span class="ms-4 mt-2 text p-absolute">Sosial Media</span>
                        </router-link>
                    </li>
                    <li class="ms-18">
                        <router-link to="/cms/about-us"
                            :class="['nav-link', isActive('/cms/about-us') ? 'active-sidebar2' : 'color-sidebar2']">
                            <span class="icon"></span>
                            <span class="ms-4 mt-2 text p-absolute">About Us Content</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" @click.prevent="toggleMasterDataDropdown"
                    :class="['nav-link bi bi-file-earmark-plus-fill color-sidebar ps-4', { 'active-sidebar': isMasterDataActive }]">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">Master Data</span>
                    <span class="bi text mt-2 p-absolute r-13"
                        :class="isUserMasterDataropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'"></span>
                </a>
                <ul v-show="isUserMasterDataropdownOpen" class="dropdown mt--3">
                    <li class="ms-18">
                        <router-link to="/master-data/level-teacher"
                            :class="['nav-link', isActive('/master-data/level-teacher') ? 'active-sidebar2' : 'color-sidebar2']">
                            <span class="icon"></span>
                            <span class="ms-4 mt-2 text p-absolute">Level Teacher</span>
                        </router-link>
                    </li>
                    <li class="ms-18">
                        <router-link to="/master-data/level-course"
                            :class="['nav-link', isActive('/master-data/level-course') ? 'active-sidebar2' : 'color-sidebar2']">
                            <span class="icon"></span>
                            <span class="ms-4 mt-2 text p-absolute">Level Course</span>
                        </router-link>
                    </li>
                    <li class="ms-18">
                        <router-link to="/master-data/category"
                            :class="['nav-link', isActive('/master-data/category') ? 'active-sidebar2' : 'color-sidebar2']">
                            <span class="icon"></span>
                            <span class="ms-4 mt-2 text p-absolute">Category</span>
                        </router-link>
                    </li>
                    <li class="ms-18">
                        <router-link to="/master-data/skills"
                            :class="['nav-link', isActive('/master-data/skills') ? 'active-sidebar2' : 'color-sidebar2']">
                            <span class="icon"></span>
                            <span class="ms-4 mt-2 text p-absolute">Skills</span>
                        </router-link>
                    </li>
                    <li class="ms-18">
                        <router-link to="/master-data/tools"
                            :class="['nav-link', isActive('/master-data/tools') ? 'active-sidebar2' : 'color-sidebar2']">
                            <span class="icon"></span>
                            <span class="ms-4 mt-2 text p-absolute">Tools</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li>
                <router-link to="/faq-admin"
                    :class="['nav-link fs-16 bi bi-question-circle-fill ps-4', isActive('/faq-admin') ? 'active-sidebar' : 'color-sidebar']">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">FAQ</span>
                </router-link>
            </li>
            <li class="ms-24">
                <a href="#" @click.prevent="toggleSettingsDropdown" class="nav-link bi bi-gear-fill color-sidebar">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">Settings</span>
                    <span class="bi text mt-2 p-absolute r-13"
                        :class="isSettingsDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'"></span>
                </a>
                <ul v-show="isSettingsDropdownOpen" class="dropdown mt--3">
                    <li class="ms-24">
                        <router-link to="/settings/my-profile"
                            :class="['nav-link', isActive('/settings/m') ? 'active-sidebar' : 'color-sidebar2']">
                            <span class="icon"></span>
                            <span class="mt-2 text p-absolute">---</span>
                        </router-link>
                    </li>
                    <li class="ms-24">
                        <router-link to="/settings/edit-password"
                            :class="['nav-link', isActive('/settings/ed') ? 'active-sidebar' : 'color-sidebar2']">
                            <span class="icon"></span>
                            <span class="mt-2 text p-absolute">--</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li>
                <router-link to="/help-center"
                    :class="['nav-link fs-16 bi bi-info-circle-fill ps-4', isActive('/help-center') ? 'active-sidebar' : 'color-sidebar']">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">Help Center</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSettingsDropdownOpen: false,
            isUserManagementDropdownOpen: false,
            isUserCMSDropdownOpen: false,
            isUserMasterDataropdownOpen: false,
            isSidebarCollapsed: false,
            collapsed: false
        };
    },
    computed: {
        isCMSActive() {
            const activeRoutes = [
                '/cms/sponsor',
                '/cms/media-partner',
                '/cms/sosial-media',
                '/cms/about-us'
            ];
            return activeRoutes.includes(this.$route.path);
        },
        isMasterDataActive() {
            const activeRoutes = [
                '/master-data/level-teacher',
                '/master-data/level-course',
                '/master-data/category',
                '/master-data/skills',
                '/master-data/tools',
            ];
            return activeRoutes.includes(this.$route.path);
        },
    },
    mounted() {
        this.updateSidebar();
        this.setupToggle();

        if (this.$route.path.includes('/my-course')) {
            this.isUserManagementDropdownOpen = true;
        }
        if (this.$route.path.includes('/cms')) {
            this.isUserCMSDropdownOpen = true;
        }
        if (this.$route.path.includes('/master-data')) {
            this.isUserMasterDataropdownOpen = true;
        }
        if (this.$route.path.includes('/settings')) {
            this.isSettingsDropdownOpen = true;
        }
    },
    beforeUnmount() {
        this.removeToggle();
    },
    methods: {
        toggleSidebar() {
            this.collapsed = !this.collapsed;
            const sidebar = this.$refs.sidebar;
            const content = document.getElementById('contentsa');
            sidebar.classList.toggle('collapsed', this.collapsed);
            content.classList.toggle('collapsed', this.collapsed);
        },
        setupToggle() {
            const toggleBtn = this.$refs.toggleBtn;
            toggleBtn.addEventListener('click', this.toggleSidebar);
        },
        removeToggle() {
            const toggleBtn = this.$refs.toggleBtn;
            toggleBtn.removeEventListener('click', this.toggleSidebar);
        },
        updateSidebar() {
            const sidebar = this.$refs.sidebar;
            if (window.innerWidth <= 769) {
                sidebar.classList.add('collapsed');
                this.collapsed = true;
            } else {
                sidebar.classList.remove('collapsed');
                this.collapsed = false;
            }
        },
        toggleSettingsDropdown() {
            this.isSettingsDropdownOpen = !this.isSettingsDropdownOpen;
        },
        toggleUserManagementDropdown() {
            this.isUserManagementDropdownOpen = !this.isUserManagementDropdownOpen;
        },
        toggleCMSDropdown() {
            this.isUserCMSDropdownOpen = !this.isUserCMSDropdownOpen;
        },
        toggleMasterDataDropdown() {
            this.isUserMasterDataropdownOpen = !this.isUserMasterDataropdownOpen;
        },
        isActive(path) {
            return this.$route.path === path;
        }
    },
    watch: {
        '$route.path'(newPath) {
            if (newPath.includes('/my-course')) {
                this.isUserManagementDropdownOpen = true;
            } else {
                this.isUserManagementDropdownOpen = false;
            }
            if (newPath.includes('/cms')) {
                this.isUserCMSDropdownOpen = true;
            } else {
                this.isUserCMSDropdownOpen = false;
            }
            if (newPath.includes('/master-data')) {
                this.isUserMasterDataropdownOpen = true;
            } else {
                this.isUserMasterDataropdownOpen = false;
            }
            if (newPath.includes('/settings')) {
                this.isSettingsDropdownOpen = true;
            } else {
                this.isSettingsDropdownOpen = false;
            }
        }
    }
};
</script>