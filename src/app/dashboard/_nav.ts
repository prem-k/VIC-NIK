export const adminNavItems = [
  {
    name: 'DASHBOARD',
    url: '/dashboard',
    icon: 'icon-speedometer',
    /*badge: {
      variant: 'info',
      text: 'NEW'
    }*/
  },    
  {
    name: 'ADMINISTRATION',
    url: '/dashboard/news',
    icon: 'icon-globe',
    children: [
      {
        name: 'NEWS/EVENT',
        url: '/dashboard/news',
        icon: 'icon-list',
        role : [1]
      },
      {
        name: 'HOME PAGE SLIDER',
        url: '/dashboard/slider',
        icon: 'icon-shuffle',
        role : [1]
      },
      {
        name: 'BANNER',
        url: '/dashboard/banners',
        icon: 'icon-flag',
        role : [1]
      },
      {
        name: 'POP UP',
        url: '/dashboard/popup-post',
        icon: 'icon-equalizer',
        role : [1]
      },
      {
        name: 'ENQUIRY',
        url: '/dashboard/enquiry',
        icon: 'icon-pencil',
        role : [1,2]
      },
      {
        name: 'FEEDBACK/SUGGESTION',
        url: '/dashboard/suggestion',
        icon: 'icon-drop',
        role : [1,2]
      }
    ]
  },    
  {
    name: 'USERS',
    url: '/dashboard/users',
    icon: 'icon-people',
    children: [
      {
        name: 'USERS LIST',
        url: '/dashboard/users',
        icon: 'icon-list',
        role : [1]
      },      
      {
        name: 'GENEALOGY',
        url: '/dashboard/users/tree',
        icon: 'icon-equalizer',
        role : [1,2]
      }/*,
      {
        name: 'Invoice',
        url: '/dashboard/invoice',
        icon: 'icon-magnifier',
        role : [1]
      }*/
    ]
  },
  {
    name: 'WITHDRAWAL REQUEST',
    url: '/dashboard/accounts',
    icon: 'icon-pie-chart',
    children: [
      {
        name: ' PAYMENT REQUEST',
        url: '/dashboard/payments',
        icon: 'icon-list',
        role : [1,2]
      }     
    ]
  },
  {
    name: 'MASTER',
    url: '/dashboard/master',
    icon: 'icon-screen-desktop',
    children: [
      {
        name: 'PRODUCT CATEGORY',
        url: '/dashboard/category',
        icon: 'icon-envelope-letter',
        role : [1]
      },
      {
        name: 'PRODUCTS',
        url: '/dashboard/products',
        icon: 'icon-pencil',
        role : [1]
      },
      {
        name: 'PURCHASE REQUEST',
        url: '/dashboard/products/purchase-request',
        icon: 'icon-pencil',
        role : [1,2]
      }
    ]
  },
  {
    name: 'BANK DETAILS AND KYC',
    url: '/dashboard/kyc',
    icon: 'icon-note',
    children: [
      {
        name: 'ACCOUNTS',
        url: '/dashboard/accounts',
        icon: 'icon-list',
        role : [2]
      },
      {
        name: 'USER KYC',
        url: '/dashboard/kyc',
        icon: 'icon-pencil',
        role : [1,2]
      }/*,
      {
        name: 'ADD USER KYC',
        url: '/dashboard/kyc/add',
        icon: 'icon-drop',
        role : [2]
      } */     
    ]
  },
  {
    name: 'BUSSINESS',
    url: '/dashboard/business',
    icon: 'icon-equalizer',
    children: [
      {
        name: 'PURCHASE SUMMARY',
        url: '/dashboard/purchase-summary',
        icon: 'icon-pencil',
        role : [1,2]
      }/*,
      {
        name: 'DIRECT SALE REGISTER',
        url: '/dashboard/direct-sale',
        icon: 'icon-drop',
        role : [1,2]
      }  */    
    ]
  }
];

export const userNavItems = [
  {
    name: 'DASHBOARD',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'GENEALOGY',
    url: '/dashboard/users/tree',
    icon: 'icon-equalizer',
    role : [1,2]
  },
  {
    name: 'SHOW PROFILE',
    url: '/dashboard/users',
    icon: 'icon-people',
    children: [
      {
        name: 'MY PROFILE',
        url: '/dashboard/users/my-profile',
        icon: 'icon-equalizer',
        role : [1,2]
      }
    ]
  },
  {
    name: 'BANK DETAILS AND KYC',
    url: '/dashboard/kyc',
    icon: 'icon-pencil',
    children: [
      {
        name: 'BANK ACCOUNT',
        url: '/dashboard/accounts',
        icon: 'icon-list',
        role : [2]
      },
      {
        name: 'UPDATE KYC',
        url: '/dashboard/kyc',
        icon: 'icon-drop',
        role : [2]
      } 
    ]
  },
  {
    name: 'WITHDRAWAL REQUEST',
    url: '/dashboard/accounts',
    icon: 'icon-pie-chart',
    children: [
      {
        name: ' PAYMENT REQUEST',
        url: '/dashboard/payments',
        icon: 'icon-list',
        role : [1,2]
      }     
    ]
  },
  {
    name: 'PURCHASE REQUEST',
    url: '/dashboard/products/purchase-request',
    icon: 'icon-pencil',
    role : [1,2]
  },
  {
    name: 'BUSSINESS',
    url: '/dashboard/business',
    icon: 'icon-equalizer',
    children: [
      {
        name: 'PURCHASE SUMMARY',
        url: '/dashboard/purchase-summary',
        icon: 'icon-pencil',
        role : [1,2]
      }     
    ]
  },    
  {
    name: 'CONTACT',
    url: '/dashboard/news',
    icon: 'icon-globe',
    children: [
      /*{
        name: 'ENQUIRY',
        url: '/dashboard/enquiry',
        icon: 'icon-pencil',
        role : [1,2]
      },*/
      {
        name: 'FEEDBACK/SUGGESTION',
        url: '/dashboard/suggestion',
        icon: 'icon-drop',
        role : [1,2]
      }
    ]
  }
];