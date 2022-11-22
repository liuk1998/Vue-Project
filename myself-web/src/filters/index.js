// 全局过滤器

// 左侧菜单显示，系统设置、其他设置单独显示.
export function activeMenuType (activeIndex) {
  activeIndex ??= ''
  const index = activeIndex.split('-')[0]
  return ['12', '19'].includes(index)
}
