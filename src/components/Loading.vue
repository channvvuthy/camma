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
        width: 60px;
        height: 60px;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 44px;
        height: 44px;
        margin: 4px;
        border-radius: 50%;
        border: 3px solid #40b366;
        border-color: #40b366 transparent #40b366 #40b366 ;
        animation: lds-dual-ring 1.2s linear infinite;
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
