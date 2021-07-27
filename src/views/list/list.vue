<template>
    <article ref="article" class="wizard__article wizard__article--active sw-list">
        <h2 class="sw-list__title" v-html="`List of ${param}`"></h2>
        <ul class="sw-list__list">
            <li
                v-for="(item, index) of model"
                :key="index"
                class="sw-list__item"
                :data-title="item.name"
                @click.prevent="selectItem(item)"
            >
                <a
                    href="#"
                    :title="`Select ${item.name}`"
                    class="sw-list__link"
                >
                    <span class="sw-list__text" v-html="item.name"></span>
                </a>
            </li>
        </ul>
    </article>
</template>
<script src="./list.ts"></script>
<style src="./list.scss" scoped></style>
