import { defineComponent, h, provide, PropType } from 'vue'

type getFirstKey<T extends Function> = T extends (arg1: infer p, ...arg: any) => unknown ? p : never
type getSecondKey<T extends Function> = T extends (arg1: any, arg2: infer p, ...arg: any) => unknown
  ? p
  : never
/**
 * @description k is key's abbr, because key is vue's component private property
 */
export const Provider = defineComponent({
  name: 'Provider',
  props: {
    k: {
      type: Object as PropType<getFirstKey<typeof provide>>,
      require: true,
    },
    value: {
      type: Object as PropType<getSecondKey<typeof provide>>,
      require: true,
    },
  },
  setup(props, ctx) {
    provide(props.k!, props.value)
    return () => h(ctx.slots.default!)
  },
})
export default Provider
