<template>
    <div class="full-height">
        <main>
            <Header />
            <BaseLayout />
            <Star />
            <Loader v-if="$store.state.showLoader" />
        </main>
    </div>
</template>
<script src="./App.ts"></script>
