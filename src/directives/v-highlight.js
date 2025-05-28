/*
  src/directives/v-highlight.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

// Check for escape characters in regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export default {
  beforeMount(el) {
    el.__originalText = el.textContent
  },
  updated(el, binding) {
    if (!binding.value) {
      el.innerHTML = el.__originalText
    } else {
      const safeValue = escapeRegExp(binding.value)
      el.innerHTML = el.__originalText.replace(
        new RegExp(safeValue, "gi"),
        (match) => `<mark>${match}</mark>`
      )
    }
  },
  mounted(el, binding) {
    el.__originalText = el.textContent
    if (binding.value) {
      const safeValue = escapeRegExp(binding.value)
      el.innerHTML = el.textContent.replace(
        new RegExp(safeValue, "gi"),
        (match) => `<mark>${match}</mark>`
      )
    }
  },
}
