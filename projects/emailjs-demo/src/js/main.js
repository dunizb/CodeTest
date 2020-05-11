import emailjs from 'emailjs-com'
import apiKeys from './apikeys'

const sendEmail = e => {
  e.preventDefault()

  emailjs
    .sendForm('gmail', apiKeys.TEMPLATE_ID, e.target, apiKeys.USER_ID)
    .then(
      result => {
        console.log(result.text)
        alert('发送成功！')
      },
      error => {
        console.log(error.text)
        alert('发送失败！')
      }
    )
}

const form = document.querySelector('.form')
form.addEventListener('submit', sendEmail)
