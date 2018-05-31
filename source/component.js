export default {
    extend(component) {

        let render = component.render,
            beforeDestroy = component.beforeDestroy

        if(render)
            component.render = function(h) {

                return render.bind(this)(
                    h,
                    {
                        state: this.$store.state,
                        data: this.$data,
                        $t: this.$t.bind(this)
                    }
                )

            }

        component.beforeDestroy = function() {
            this.$emit('beforeDestroy')
            if(beforeDestroy)
                beforeDestroy.bind(this)()
        }

        return component

    }
}