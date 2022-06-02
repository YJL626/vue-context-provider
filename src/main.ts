import { defineComponent, h, provide, PropType } from 'vue'

type getFirstKey<T extends Function> = T extends (arg1: infer p, ...arg: any) => unknown ? p : never
type getSecondKey<T extends Function> = T extends (arg1: any, arg2: infer p, ...arg: any) => unknown
  ? p
  : never

export const Provider = defineComponent({
  name: 'Provider',
  props: {
    key: {
      type: Object as PropType<getFirstKey<typeof provide>>,
      require: true,
    },
    value: {
      type: Object as PropType<getSecondKey<typeof provide>>,
      require: true,
    },
  },
  setup(props, ctx) {
    provide(props.key!, props.value)
    return () => h(ctx.slots.default!)
  },
})
export default Provider
