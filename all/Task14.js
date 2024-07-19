// Create a dynamic function that changes the component value of route to unsubscribed based on the subscription values.

// Replace the component(comp) value with 'UN'(unsubscribed) if the module is not subscribed.

// Subscription and Routes value are given below.
// Also handle the edge case 
// * if module is not present in subscription value, then that module is automatically unsubscribed.
// * if outer module is not subscribed then replace the subComp with key comp and value "UN" ( as if the main module is not subscribed that would mean subModules are also unsubscribed )

// Add redirect-to value based on the first subscribed module.

// *Output would look something like this*
// <pre><code class="javascript">
//  [{
//    redirectTo: 'M1'
//   },
//   {
//     name: 'M1',
//     comp: 'C1',
//   },
//   .............
//   .............
//   {
//     name: 'M4',
//     subComp: [
//       {
//         redirectTo: 'M4B',
//       },
//       {
//         name: 'M4A',
//         comp: 'UN',
//       },
//       {
//         name: 'M4B',
//         comp: 'C4B',
//       },
//     ],
//   },
//   ..............
//   .............
//  ]
// </code></pre>

// <pre><code class="javascript">
// const routes = [
//   {
//     name: 'M1',
//     comp: 'C1',
//   },
//   {
//     name: 'M2',
//     comp: 'C2',
//   },
//   {
//     name: 'M3',
//     subComp: [
//       {
//         name: 'M3A',
//         comp: 'C3A',
//       },
//       {
//         name: 'M3B',
//         comp: 'C3B',
//       },
//     ],
//   },
//   {
//     name: 'M4',
//     subComp: [
//       {
//         name: 'M4A',
//         comp: 'C4A',
//       },
//       {
//         name: 'M4B',
//         comp: 'C4B',
//       },
//     ],
//   },
//   {
//     name: 'M5',
//     subComp: [
//       {
//         name: 'M5A',
//         comp: 'C5A',
//       },
//       {
//         name: 'M5B',
//         subComp: [
//           {
//             name: 'M5BA',
//             comp: 'C5BA',
//           },
//           {
//             name: 'M5BB',
//             comp: 'C5BB',
//           },
//           {
//             name: 'M5BC',
//             comp: 'C5BC',
//           },
//         ],
//       },
//       {
//         name: 'M5C',
//         comp: 'C5C',
//       },
//     ],
//   },
// ];

// const subscription = [
//   {
//     name: 'M1',
//     isSub: true,
//   },
//   {
//     name: 'M2',
//     isSub: false,
//   },
//   {
//     name: 'M3',
//     isSub: false,
//     subMod: [
//       {
//         name: 'M3A',
//         isSub: true,
//       },
//       {
//         name: 'M3B',
//         isSub: true,
//       },
//     ],
//   },
//   {
//     name: 'M4',
//     isSub: true,
//     subMod: [
//       {
//         name: 'M4A',
//         isSub: false,
//       },
//       {
//         name: 'M4B',
//         isSub: true,
//       },
//     ],
//   },
//   {
//     name: 'M5',
//     isSub: true,
//     subMod: [
//       {
//         name: 'M5A',
//         isSub: false,
//       },
//       {
//         name: 'M5B',
//         isSub: true,

//         subComp: [
//           {
//             name: 'M5BA',
//             isSub: false,
//           },
//           {
//             name: 'M5BB',
//             isSub: true,
//           },
//           {
//             name: 'M5BC',
//             isSub: false,
//           },
//         ],
//       },
//       {
//         name: 'M5C',
//         isSub: true,
//       },
//     ],
//   },
// ];
// </code></pre>


function editRoutesMethod(routes, subscriptions) {
    const map = new Map();
    
    // Create a map for quickly getting subscription statuses
    subscriptions.forEach(sub => map.set(sub.name, sub) )

    // function to recursively update the components
    function editFunction(route) {
        const sub = map.get(route.name);

        // check if sub is subscribed or not
        if (!sub || !sub.isSub) {

            // If the module is not subscribed 
            if (route.comp) route.comp = 'UN';
            
            if (route.subComp) {
                route.subComp = route.subComp.map((sub) => {

                    sub.comp = 'UN'; // mark comp field in subcomponent to 'UN'
                    
                    // recursively travel to the subcomponents and update their routes as well
                    if (sub.subComp)editFunction(sub);

                    // return subcomp
                    return sub;
                });
            }
        } else {
            // If the module is subscribed, we will check it's submodules also
            if (route.subComp) {
                
                // loop through subcomponent as well to update the components and subcomp also
                route.subComp = route.subComp.map(sub => {
                    const subSub = sub.subMod ? sub.subMod.find(s => s.name === sub.name) : null;
                    if (subSub && subSub.isSub) {

                        // check is for if subcomponent is present or not
                        if (sub.subComp) {
                            editFunction(sub);
                        }
                    } 
                    else {
                        sub.comp = 'UN';
                        
                        // check is for if subcomponent is present or not
                        if (sub.subComp) {
                            editFunction(sub);
                        }
                    }

                    return sub;
                });
            }
        }
        return route;
    }

    // list to get the updated routes
    let updatedRoutes = routes.map(route => editFunction(route));

    // to get the first subscribed module
    const firstModule = subscriptions.find(sub => sub.isSub);

    // adding redirecting to the final object
    if (firstModule) {
        updatedRoutes = [{
            redirectTo: firstModule.name
        }, ...updatedRoutes];
    }

    return updatedRoutes;
}

const routes = [
    {
        name: 'M1',
        comp: 'C1',
    },
    {
        name: 'M2',
        comp: 'C2',
    },
    {
        name: 'M3',
        subComp: [
            {
                name: 'M3A',
                comp: 'C3A',
            },
            {
                name: 'M3B',
                comp: 'C3B',
            },
        ],
    },
    {
        name: 'M4',
        subComp: [
            {
                name: 'M4A',
                comp: 'C4A',
            },
            {
                name: 'M4B',
                comp: 'C4B',
            },
        ],
    },
    {
        name: 'M5',
        subComp: [
            {
                name: 'M5A',
                comp: 'C5A',
            },
            {
                name: 'M5B',
                subComp: [
                    {
                        name: 'M5BA',
                        comp: 'C5BA',
                    },
                    {
                        name: 'M5BB',
                        comp: 'C5BB',
                    },
                    {
                        name: 'M5BC',
                        comp: 'C5BC',
                    },
                ],
            },
            {
                name: 'M5C',
                comp: 'C5C',
            },
        ],
    },
];

const subscriptions = [
    {
        name: 'M1',
        isSub: true,
    },
    {
        name: 'M2',
        isSub: false,
    },
    {
        name: 'M3',
        isSub: false,
        subMod: [
            {
                name: 'M3A',
                isSub: true,
            },
            {
                name: 'M3B',
                isSub: true,
            },
        ],
    },
    {
        name: 'M4',
        isSub: true,
        subMod: [
            {
                name: 'M4A',
                isSub: false,
            },
            {
                name: 'M4B',
                isSub: true,
            },
        ],
    },
    {
        name: 'M5',
        isSub: true,
        subMod: [
            {
                name: 'M5A',
                isSub: false,
            },
            {
                name: 'M5B',
                isSub: true,
                subComp: [
                    {
                        name: 'M5BA',
                        isSub: false,
                    },
                    {
                        name: 'M5BB',
                        isSub: true,
                    },
                    {
                        name: 'M5BC',
                        isSub: false,
                    },
                ],
            },
            {
                name: 'M5C',
                isSub: true,
            },
        ],
    },
];

console.log(editRoutesMethod(routes, subscriptions));
