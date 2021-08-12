export const formConfig = (fullName, url, history) => {
  return {
    fields: [
      { label: 'fullName', type: 'text', name: 'fullname', clearButton: true, options: { placeholder: 'Jhon Doe', value: fullName }},
      { label: 'Avatar', type: 'text', name: 'avatar', clearButton: true, options: { placeholder: 'https://avatar.image/url', value: url }},
    ],
    buttons: [
      { label: 'Update', class: 'primary', type: 'submit' },
      {
          label: 'Cancel', class: 'secondary', type: 'button',
          function: () => history.push("/lobby", { from: "profile" })
      }
    ]
  }
}