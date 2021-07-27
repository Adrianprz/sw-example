import { Component, Provide, Vue } from "vue-property-decorator";
import Wizard from 'Project/components/common/wizard/wizard.vue';
import { CurrentPage } from "Project/components/common/baselayout/base.vm";

Vue.component('Wizard', Wizard);

@Component
class BaseLayout extends Vue {

    @Provide()
    currentPage: CurrentPage = Vue.observable({
        index: 0,
    });

    initModelSteps: { title: string }[] = [
        {
            title: 'Categories',
        },
        {
            title: 'List',
        },
        {
            title: 'Info',
        },
    ];
}

export default BaseLayout;