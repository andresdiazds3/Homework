import { NaryNode } from '../classes/NaryNode';
import { NaryTree } from '../classes/NaryTree';

const root = new NaryNode({
  id: 'root',
  title: 'Menu',
  link: '/menu',
  children: [
    new NaryNode({
      id: 'account',
      title: 'Account',
      link: '/account',
      children: [
        new NaryNode({
          id: 'security',
          title: 'Security',
          link: '/account/security',
        }),
        new NaryNode({
          id: 'privacy',
          title: 'Privacy',
          link: '/account/privacy',
        }),
      ],
    }),
    new NaryNode({
      id: 'products',
      title: 'Products',
      link: '/products',
      children: [
        new NaryNode({
          id: 'new-arrivals',
          title: 'New Arrivals',
          link: '/products/new-arrivals',
        }),
        new NaryNode({
          id: 'discounts',
          title: 'Discounts',
          link: '/products/discounts',
        }),
      ],
    }),
    new NaryNode({
      id: 'support',
      title: 'Support',
      link: '/support',
      children: [
        new NaryNode({
          id: 'faq',
          title: 'FAQ',
          link: '/support/faq',
        }),
        new NaryNode({
          id: 'contact',
          title: 'Contact',
          link: '/support/contact',
        }),
      ],
    }),
  ],
});

export const naryMenuTree = new NaryTree({ root });
