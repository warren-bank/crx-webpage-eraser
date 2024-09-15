let active_mode_enabled = false

const css_classname = 'webpage-eraser'
const use_capture   = true

const erase_history = {
  done:   [], // {element, parentNode, nextSibling}
  undone: []
}

const cancel_event = (event) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
}

const handle_click_event = (event) => {
  cancel_event(event)

  const element = event.target
  const tagName = element.tagName.toUpperCase()

  const blacklist = ['BODY', 'HEAD', 'HTML']
  if (blacklist.indexOf(tagName) === -1) {
    erase_history.done.push({element, parentNode: element.parentNode, nextSibling: element.nextSibling})
    erase_history.undone = []

    element.remove()
  }
}

const handle_keydown_event = (event) => {
  if (event.key === 'Escape') {
    cancel_event(event)

    disable_active_mode()
  }
  else if (event.ctrlKey && (event.key === 'z')) {
    if (erase_history.done.length) {
      cancel_event(event)

      const erasure = erase_history.done.pop()
      erase_history.undone.push(erasure)

      const {element, parentNode, nextSibling} = erasure
      if (nextSibling)
        parentNode.insertBefore(element, nextSibling)
      else
        parentNode.appendChild(element)
    }
  }
  else if (event.ctrlKey && (event.key === 'y')) {
    if (erase_history.undone.length) {
      cancel_event(event)

      const erasure = erase_history.undone.pop()
      erase_history.done.push(erasure)

      erasure.element.remove()
    }
  }
}

const enable_active_mode = () => {
  document.addEventListener('click',   handle_click_event,   use_capture)
  document.addEventListener('keydown', handle_keydown_event, use_capture)
  document.body.classList.add(css_classname)
  active_mode_enabled = true
}

const disable_active_mode = () => {
  document.removeEventListener('click',   handle_click_event,   use_capture)
  document.removeEventListener('keydown', handle_keydown_event, use_capture)
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
