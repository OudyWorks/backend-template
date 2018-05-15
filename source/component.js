export default {
    extend(component) {

        let render = component.render

        component.render = function(h) {

            return render.bind(this)(
                h,
                {
                    // state: this.$store.state,
                    data: this.$data,
                    $t: this.$t.bind(this)
                }
            )

        }

        return component

    }
}