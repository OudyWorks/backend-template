<script>
    export default {
        name: 'module-logo',
        render(h) {
            return h(
                'router-link',
                {
                    class: ['uk-navbar-item', 'uk-logo', true && 'uk-padding-remove-right'],
                    attrs: {
                        to: '/'
                    }
                },
                'LOGO'
            )
        }
    }
</script>