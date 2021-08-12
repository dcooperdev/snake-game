export const formConfig = (history) => {
  return {
    fields: [
      { label: 'Username or email', type: 'text', name: 'username', options: { placeholder: 'Username or email' }},
      { label: 'Password', type: 'password', name: 'password', options: { placeholder: 'Password' } }
    ],
    buttons: [
      { label: 'Login', class: 'primary', type: 'submit' },
      {
          label: 'Signup', class: 'secondary', type: 'button',
          function: () => history.push("/signup", { from: "login" })
      }
    ]
  }
}