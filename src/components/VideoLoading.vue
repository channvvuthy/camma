<template>
    <div class="box">
        <div class="lds-dual-ring"></div>
    </div>
</template>
<style scoped>
    html {
        height: 100%;
    }

    body {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        min-height: 100%;
        overflow: hidden;
    }

    .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #ffffff;
        border-color: #ffffff transparent #ffffff #ffffff;
        animation: lds-dual-ring 1s linear infinite;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>
