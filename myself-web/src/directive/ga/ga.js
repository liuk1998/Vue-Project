// 自定义指令的钩子函数
export default {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  /**
   * 钩子函数参数
   * @param {*} el: 指令所绑定的元素，可以用来直接操作 DOM。
   * @param {*} binding: 一个对象，包含: name：指令名，不包括 v- 前缀。
   *                                  value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
   *                                  oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
   *                                  expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
   *                                  arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
   *                                  modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
   * @param {*} vnode：Vue 编译生成的虚拟节点。
   * @param {*} oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
   * 注意：除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。
   */
  binding (el, binding) {
    el.addEventListener('click', () => {
      console.log(binding)
      const { eventCategory, eventAction, eventLabel, eventValue } = binding.value
      if (window.gtag) {
        window.gtag('event', eventAction, {
          event_category: eventCategory,
          event_label: eventLabel,
          value: eventValue,
          send_to: 'G-WP70ELGEPN'
        })
      }
    })
  },
  // 只调用一次，指令与元素解绑时调用。
  unbind (el) {
    el.removeEventListener('click', () => {})
  }
}
