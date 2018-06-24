export default {
    extend(component) {

        let render = component.render,
            beforeDestroy = component.beforeDestroy,
            created = component.created

        if(render)
            component.render = function(h, options = {}) {

                return render.bind(this)(
                    h,
                    Object.assign(
                        options,
                        {
                            state: this.$store.state,
                            data: this.$data,
                            $t: this.$t.bind(this)
                        }
                    )
                )

            }

        component.created = function() {
            Object.keys(this.$store.state.state).forEach(
                key =>
                    this.$set(this, key, this.$store.state.state[key])
            )
            this.$set(this.$store.state, 'state', {})
            if(created)
                created.bind(this)()
        }

        component.beforeDestroy = function() {
            this.$emit('beforeDestroy')
            if(beforeDestroy)
                beforeDestroy.bind(this)()
        }

        return component

    }
}