let active_mode_enabled = false

const css_classname = 'webpage-eraser'

const handle_click_event = (event) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()

  const element = event.target
  const tagName = element.tagName.toUpperCase()

  const blacklist = ['BODY', 'HEAD', 'HTML']
  if (blacklist.indexOf(tagName) === -1) {
    element.remove()
  }
}

const handle_keyup_event = (event) => {
  if (event.key === 'Escape') {
    disable_active_mode()
  }
}

const enable_active_mode = () => {
  document.addEventListener('click', handle_click_event)
  document.addEventListener('keyup', handle_keyup_event)
  document.body.classList.add(css_classname)
  active_mode_enabled = true
}

const disable_active_mode = () => {
  document.removeEventListener('click', handle_click_event)
  document.removeEventListener('keyup', handle_keyup_event)
  document.body.classList.remove(css_classname)
  active_mode_enabled = false
}

const toggle_active_mode = () => {
  if (active_mode_enabled)
    disable_active_mode()
  else
    enable_active_mode()
}

const process_runtime_message = (message) => {
  if (message === 'toggle_active_mode')
    toggle_active_mode()
}

chrome.runtime.onMessage.addListener(process_runtime_message)
