/* --------------------------------------------function for BMI calculation----------------------------------------------- */
const calBMI = (user) => {
  const bmi = (user.currentWeight * 10000) / (user.height * user.height);
  console.log(bmi);
  var category = '';

  switch (true) {
    case bmi < 18.5:
      console.log('under Weight');
      category = 'under Weight';
      break;
    case bmi < 24.9:
      console.log('normal & healthy Weight');
      category = 'normal & healthy Weight';
      break;
    case bmi < 29.9:
      console.log('over Weight');
      category = 'over Weight';
      break;
    case bmi > 30.0:
      console.log('obese Weight');
      category = 'obese Weight';
      break;
    default:
      console.log('lol');
      category = 'lol';
      break;
  }
  return { category, bmi };
};
/* --------------------------------------------function for BMR calculation----------------------------------------------- */

const calBMR = (user) => {
  if (user.gender === 'male') {
    return user.currentWeight * 10 + 6.25 * user.height - 5 * user.age + 5;
  } else {
    return user.currentWeight * 10 + 6.25 * user.height - 5 * user.age - 166;
  }
};
/* --------------------------------------------function for activityIndex calculation----------------------------------------------- */

const calorate = (user) => {
  console.log(typeof user.activityLevel);
  switch (user.activityLevel) {
    case '1':
      return 1.2;
      break;
    case '2':
      return 1.375;
      break;
    case '3':
      return 1.55;
      break;
    case '4':
      return 1.725;

      break;
    case '5':
      return 1.9;
      break;
    default:
      return null;
      break;
  }
};

module.exports = { calBMI, calBMR, calorate };
