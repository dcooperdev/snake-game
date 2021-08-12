export const formConfig = (history) => {
  return {
    fields: [
      { label: 'Username or email', type: 'text', name: 'username', options: { placeholder: 'Username or email' }},
      { label: 'Password', type: 'password', name: 'password', options: { placeholder: 'Password' }},
      { label: 'Repeat password', type: 'password', name: 'repassword', options: { placeholder: 'Password' }},
      { label: 'fullName', type: 'text', name: 'fullname', options: { placeholder: 'Jhon Doe' }},
    ],
    buttons: [
      { label: 'Signup', class: 'primary', type: 'submit' },
      { 
          label: 'Login', class: 'secondary', type: 'button',
          function: () => history.push("/login", { from: "signup" })
      }
    ]
  }
}