export default function classes(layout) {
    return {
        'page.container': [
            'tm-page-container'
        ],
        'page': [
            'tm-page'
        ],
        'header-mobile': [
            'tm-header-mobile', `uk-hidden@${layout.mobile.breakpoint}`
        ],
        'toolbar': [
            'tm-toolbar', `uk-visible@${layout.mobile.breakpoint}`, 'uk-hidden'
        ],
        'toolbar.container': [
            'uk-container', 'uk-flex', 'uk-flex-middle', layout.toolbar.fullWith && 'uk-container-expand', layout.toolbar.center && 'uk-flex-center'
        ],
        'header': [
            'tm-header', `uk-visible@${layout.mobile.breakpoint}`
        ],
        'header.container': [
            'uk-container', layout.header.fullWith && 'uk-container-expand', layout.header.removeLogoPadding && 'uk-padding-remove-left'
        ],
        'main': [
            'tm-main', 'uk-section', 'uk-section-default'
        ],
        'main.container': [
            'uk-container'
        ],
        'main.grid': [
            'uk-grid', layout.sidebar.gutter && `uk-grid-${layout.sidebar.gutter}`, layout.sidebar.divider && 'uk-grid-divider'
        ],
        'view': [
            
        ],
        'breadcrumbs': [
            layout.breadcrumbs && 'uk-margin-medium-bottom'
        ],
        'sidebar': [
            'tm-sidebar', `uk-width-${layout.sidebar.width}@${layout.sidebar.breakpoint}`, layout.sidebar.first && `uk-flex-first@${layout.sidebar.breakpoint}`
        ],
        'footer': [
            'tm-footer', 'uk-section-secondary', 'uk-section', 'uk-section-small'
        ]
    }
}