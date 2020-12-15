export const FETCH_SERVICES = "FETCH_SERVICES"

export function fetchServices() {

  const serviceList = [
    {
      id:1,
      name: "AdvantagePlus : Extended Warranty for 4th Year",
      description: "Please choose this option If you would like to have a 4th year extended warranty",
      detail: "If your Mercedes-Benz car is within 3 years warranty, we provide you an excellent product to extend your warranty to the 4 th year with a full protection!\r\n With the full scope Advantageplus product, you can protect you vehicle to any kind of technical breakdowns without any mileage limitations.\r\n All product related technical breakdowns are covered and will be fixed free of charge including related labour costs.",
      remark: "*there will be additional price need to be paid, the service advisor will contact you directly for more information.",
      price: "",
    },
    {
      id:2,
      name: "Detailed Cleaning",
      description: "Restore your cars original beauty with a detailed exterior & interior cleaning done by our experts.",
      detail: "Detailed Cleaning including the followong services:\n- Anti-bacterial interior cleaning\n- Engine cleaning\n- Exterior paint protection\n- Polishing\n- Window tint films\n - Air conditioner cleaning.",
      remark: "* These services vary from workshop to workshop. There will be some additional prices to be paid. The service advisor will contact you directly for more information.",
      price: "",
    }
  ]

  return {
    type: FETCH_SERVICES,
    payload: serviceList,
  }
}
