<template>
    <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
    >
        <nuxt-link
            class="
                sidebar-brand
                d-flex
                align-items-center
                justify-content-center
            "
            to="/"
        >
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Nuxt</div>
        </nuxt-link>

        <hr class="sidebar-divider my-0" />
        <li class="nav-item active">
            <nuxt-link class="nav-link" to="/">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </nuxt-link>
        </li>
        <hr class="sidebar-divider" />
        <div class="sidebar-heading">Master Data</div>
        <li class="nav-item active">
            <nuxt-link class="nav-link" to="/users">
                <i class="fas fa-fw fa-users"></i>
                <span>Manage Users</span>
            </nuxt-link>
        </li>
    </ul>
</template>