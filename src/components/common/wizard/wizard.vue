<template>
    <section class="wizard">
        <div class="container">
            <div class="wizard__container">
                <div class="wizard__steps steps" data-navigation="false">
                    <nav class="wizard__nav">
                        <div class="container">
                            <ul
                                class="wizard__list"
                                :class="{
                                    'wizard__list--init': index === 0,
                                    'wizard__list--mid': index >= 1,
                                    'wizard__list--end': index >= 2,
                                }"
                            >
                                <li
                                    class="wizard__item step"
                                    :class="{
                                        'wizard__item--active active':
                                            index === indexPosition,
                                        'wizard__item--accepted':
                                            data.completed,
                                    }"
                                    v-for="(data, indexPosition) in modelHeader"
                                    :key="indexPosition"
                                >
                                    <a
                                        href="#"
                                        :title="data.title"
                                        class="wizard__link"
                                    >
                                        <span
                                            class="wizard__txt step__context"
                                            >{{ data.title }}</span
                                        >
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div>
                        <div
                            class="wizard__content steps__content loaded"
                            :class="{
                                'wizard__content--one': index === 0,
                                'wizard__content--second': index === 1,
                                'wizard__content--third': index === 2,
                            }"
                        >
                            <slot name="PanelWizard"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script src="./wizard.ts"></script>
<style src="./wizard.scss"></style>
