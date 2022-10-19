//! JavaScript
//! replacer-util ~~ MIT License
// File: mock1.js

let π1 = 3.14;
let τ1 = 2 * π1;

const info1 = {
   banner:      '🔍🔍🔍 {{pkg.name}} v{{pkg.version}} 🔍🔍🔍',
   description: '{{pkg.description}}',
   list1:       'insect, insect, insect',
   list2:       'insect, iNsEcT, INSECT, insect',
   math:        { π1, τ1 },
   };

export { info1 };

//! JavaScript
//! replacer-util ~~ MIT License
// File: mock2.js

let π2 = 3.14;
let τ2 = 2 * π2;

const info2 = {
   banner:      '🔍🔍🔍 {{pkg.name}} v{{pkg.version}} 🔍🔍🔍',
   description: '{{pkg.description}}',
   list1:       'insect, insect, insect',
   list2:       'insect, iNsEcT, INSECT, insect',
   math:        { π2, τ2 },
   };

export { info2 };
