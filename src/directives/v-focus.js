/*
  src/directives/v-focus.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

// Focus on element on mount
export default {
  mounted(el) {
    el.focus()
  },
}
