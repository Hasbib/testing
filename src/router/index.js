import { createRouter, createWebHistory } from 'vue-router';


import MasterDataSkill from '@/pages/role/superadmin/masterdata/MasterDataSkill.vue';

const routes = [

  { path: '/', component: MasterDataSkill },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
