<template>
    <div id="sidebar" class="sd sidebar-teacher" :class="['side', { collapsed }]" ref="sidebar">
        <ul>
            <li class="menu-header">
                <span class="menu-text-teacher text-white">Menu</span>
                <button id="toggle-btn" class="btn btn-primary" ref="toggleBtn">
                    <span class="toggle-teacher">&#9776;</span>
                </button>
            </li>
            <li class="ms-18 mt-12">
                <router-link to="/dashboard-teacher"
                    :class="['nav-link fs-16 bi bi-house-door-fill', isActive('/dashboard-teacher') ? 'active-sidebar' : 'color-sidebar']">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">Dashboard</span>
                </router-link>
            </li>
            <li class="ms-18 mt-12">
                <router-link to="/course-manajemen"
                    :class="['nav-link fs-16 bi bi-map-fill', isActive('/course-manajemen') ? 'active-sidebar' : 'color-sidebar']">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">Course Manajemen</span>
                </router-link>
            </li>
            <li class="ms-18 mt-2">
                <a href="#" @click.prevent="toggleSettingsDropdown" class="nav-link bi bi-gear color-sidebar">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">Settings</span>
                    <span class="bi text mt-2 p-absolute r-17"
                        :class="isSettingsDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'"></span>
                </a>
                <ul v-show="isSettingsDropdownOpen" class="dropdown mt--3">
                    <li class="ms-18">
                        <router-link to="/settings/level"
                            :class="['nav-link', isActive('/settings/level') ? 'active-sidebar' : 'color-sidebar']">
                            <span class="icon"></span>
                            <span class="mt-2 text p-absolute">Level</span>
                        </router-link>
                    </li>
                    <li class="ms-18">
                        <router-link to="/settings/my-profile"
                            :class="['nav-link', isActive('/settings/my-profile') ? 'active-sidebar' : 'color-sidebar']">
                            <span class="icon"></span>
                            <span class="mt-2 text p-absolute">My Profile</span>
                        </router-link>
                    </li>
                    <li class="ms-18">
                        <router-link to="/settings/edit-password"
                            :class="['nav-link', isActive('/settings/edit-password') ? 'active-sidebar' : 'color-sidebar']">
                            <span class="icon"></span>
                            <span class="mt-2 text p-absolute">Edit Password</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="ms-18 mt-2">
                <router-link to="/help-desk"
                    :class="['nav-link fs-16 bi bi-info-circle-fill', isActive('/help-desk') ? 'active-sidebar' : 'color-sidebar']">
                    <span class="icon"></span>
                    <span class="mt-2 text p-absolute">Help Desk</span>
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
            isSidebarCollapsed: false,
            collapsed: false
        };
    },
    mounted() {
        this.updateSidebar();
        this.setupToggle();

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
            const content = document.getElementById('content');
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
        isActive(path) {
            return this.$route.path === path;
        }
    },
    watch: {
        '$route.path'(newPath) {
            if (newPath.includes('/settings')) {
                this.isSettingsDropdownOpen = true;
            } else {
                this.isSettingsDropdownOpen = false;
            }
        }
    }
};
</script>