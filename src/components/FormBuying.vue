<template>
  <div id="formBuying">
    <pre class="menu">
        <div class="circle" v-bind:class="{ circle__active: data.isActive1 }">1</div> Delivery  >   <div class="circle" v-bind:class="{ circle__active: data.isActive2 }">2</div> Payment   >   <div class="circle" v-bind:class="{ circle__active: data.isActive3 }">3</div> Finish
    </pre>
    <div class="form">
        <p v-if="data.lastState == false"><span v-on:click="back" class="buttonP">&larr; Back to {{data.backText}}</span></p>
        <p v-if="data.lastState == true"> </p>
        <div class="content displayGrid">
            <div v-if="data.step1 == true" class="content__left" id="step1">
                <div class="content__left__top">
                    <div>
                        <h2>Delivery details</h2>
                        <hr>
                    </div>
                    <label class="checklabel">Send as dropshipper
                        <input type="checkbox" v-model="data.isDropship" v-on:click="changeDropship">
                        <span class="checkmark" v-bind:class="{ check__active: data.isDropship }"></span>
                    </label>
                </div>
                <div class="content__left__middleLeft">
                    <label for="name" class="inp">
                        <input type="text" id="name" v-model="data.name" placeholder="" required>
                        <span class="label">Name</span>
                    </label>
                    <label for="phone" class="inp">
                        <input type="tel" id="phone" placeholder="" v-model="data.phone" @keydown="validPhone" @keyup="phoneValidation" v-bind:class="{ valid: data.isValidPhone, invalid: data.isInvalidPhone }" >
                        <span class="label" v-bind:class="{ 'text-success': data.isValidPhone, 'text-danger': data.isInvalidPhone }">Phone Number</span>
                    </label>
                    <label for="address" class="inp">
                        <span class="labelarea">Address</span>
                        <textarea id="address" v-model="data.address" @keyup="addressValidation" rows="4" placeholder="" required></textarea>
                        <span class="counter" v-bind:class="{ 'text-danger': data.isValidAddress }">{{data.counter}}/120</span>
                    </label>
                </div>
                <div class="content__left__middleRight">
                    <div>
                        <label for="dropnumber" class="inp">
                            <input type="tel" id="dropnumber" placeholder="" v-model="data.dropphone" @keydown="validPhone" @keyup="dropPhoneValidation" v-bind:class="{ valid: data.isValidDropPhone, invalid: data.isInvalidDropPhone }" :disabled="!data.isDropship">
                            <span class="label" v-bind:class="{ 'text-success': data.isValidDropPhone, 'text-danger': data.isInvalidDropPhone }">Dropshipper Phone Number</span>
                        </label>
                        <label for="dropname" class="inp">
                            <input type="text" id="dropname" v-model="data.dropname" placeholder="" required :disabled="!data.isDropship">
                            <span class="label">Dropshipper Name</span>
                        </label>
                    </div>
                </div>
            </div>
            <div v-if="data.step2 == true" class="content__left" id="step2">
                <div class="content__left__top">
                    <div>
                        <h2>Shipment</h2>
                        <hr>
                    </div>
                </div>
                <div class="content__left__middle">
                    <label for="gosend" class="inp2">
                        <input type="button" id="gosend" v-on:click="chooseShipment" v-bind:class="{ valid: data.isGosend, validbox: data.isGosend }">
                        <span class="label">{{formatPrice(data.gosend)}}</span>
                        <span class="label">GO-SEND</span>
                    </label>
                    <label for="jne" class="inp2">
                        <input type="button" id="jne" v-on:click="chooseShipment" v-bind:class="{ valid: data.isJne, validbox: data.isJne }">
                        <span class="label">{{formatPrice(data.jne)}}</span>
                        <span class="label">JNE</span>
                    </label>
                    <label for="courier" class="inp2">
                        <input type="button" id="courier" v-on:click="chooseShipment" v-bind:class="{ valid: data.isCourier, validbox: data.isCourier }">
                        <span class="label">{{formatPrice(data.courier)}}</span>
                        <span class="label">Personal Courier</span>
                    </label>
                </div>
                <div class="content__left__top">
                    <div>
                        <h2>Payment</h2>
                        <hr>
                    </div>
                </div>
                <div class="content__left__middle">
                    <label for="ewallet" class="inp2">
                        <input type="button" id="ewallet" v-on:click="choosePayment" v-bind:class="{ valid: data.ewallet, validbox: data.ewallet }">
                        <span class="label">{{formatPrice(1500000)}} left</span>
                        <span class="label">e-Wallet</span>
                    </label>
                    <label for="transfer" class="inp2">
                        <input type="button" id="transfer" v-on:click="choosePayment" v-bind:class="{ valid: data.transfer, validbox: data.transfer }">
                        <span class="label">Bank Transfer</span>
                    </label>
                    <label for="virtual" class="inp2">
                        <input type="button" id="virtual" v-on:click="choosePayment" v-bind:class="{ valid: data.virtual, validbox: data.virtual }">
                        <span class="label">Virtual Account</span>
                    </label>
                </div>
            </div>
            <div v-if="data.step3 == true" class="content__left" id="step3">
                <div class="content__left__middle">
                    <div class="contentMiddle">
                        <h2>Thank you</h2>
                        <hr>
                        <p>Order ID : {{data.orderId}}</p>
                        <p v-if="data.isGosend == true">Your order will be send today with GO-SEND</p>
                        <p v-if="data.isJne == true">Your order will be send in 2 days with JNE</p>
                        <p v-if="data.isCourier == true">Your order will be send in 1 days with Personal Courier</p>
                        <p><span v-on:click="backHome" class="buttonP">&larr; Go to homepage</span></p>
                    </div>
                </div>
            </div>
            <div class="content__right">
                <div class="content__right__top">
                    <h2>Summary</h2>
                    <p>10 Items purchased</p>
                    <hr v-if="data.isGosend == true || data.isJne == true || data.isCourier == true" align="left" width="20%">
                    <p v-if="data.isGosend == true || data.isJne == true || data.isCourier == true">Delivery estimation</p>
                    <p v-if="data.isGosend == true" class="greenText">today by <strong>GO-SEND</strong></p>
                    <p v-if="data.isJne == true" class="greenText">2 days by <strong>JNE</strong></p>
                    <p v-if="data.isCourier == true" class="greenText">1 days by <strong>Personal Courier</strong></p>
                </div>
                <div class="content__right__middle">
                    <p>Cost of goods <span>{{formatPrice(data.costofGoods)}}</span></p>
                    <p v-if="data.isDropship == true">Dropshipping Fee <span>{{formatPrice(data.dropshipFee)}}</span></p>
                    <p v-if="data.isGosend == true"><strong>GO-SEND</strong> shipment<span>{{formatPrice(data.gosend)}}</span></p>
                    <p v-if="data.isJne == true"><strong>JNE</strong> shipment<span>{{formatPrice(data.jne)}}</span></p>
                    <p v-if="data.isCourier == true"><strong>COURIER</strong> shipment<span>{{formatPrice(data.courier)}}</span></p>
                    <h2>Total <span>{{formatPrice(data.total)}}</span></h2>
                </div>
                <input v-if="data.lastState == false" type="button" :value="data.buttonText" v-on:click="payment">
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import $ from 'jquery';

@Component
export default class FormBuying extends Vue {
    public dat: any = JSON.parse(localStorage.getItem('currentState') || 'null');
    public data: any = this.dat != null? this.dat : {backText: 'cart', isValidPhone: false, isInvalidPhone: false,
        name: '', phone: '', isValidDropPhone: false, isInvalidDropPhone: false, dropphone: '', dropname: '', counter: 0,
        address: '', isValidAddress: false, isDropship: false, costofGoods: 500000, total: 500000, total2: 500000,
        dropshipFee: 5900, isActive1: true, isActive2: false, isActive3: false, isGosend: false, isJne: false,
        isCourier: false, gosend: 15000, jne: 9000, courier: 29000, ewallet: false, transfer: false, virtual: false,
        buttonText: 'Continue to Payment', lastState: false, orderId: '', step1: true, step2: false, step3: false};

    public formatPrice(value: any) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    public addressValidation(ev: any) {
        this.data.counter = this.data.address.length;
        if (this.data.address.length > 120) {
            this.data.isValidAddress = true;
        } else {
            this.data.isValidAddress = false;
        }
    }

    public changeDropship(ev: any) {
        if (ev.target.checked === true) {
            if (this.data.total !== this.data.costofGoods) {
                this.data.total = this.data.total + this.data.dropshipFee;
                this.data.total2 = this.data.costofGoods + this.data.dropshipFee;
            } else {
                this.data.total = this.data.costofGoods + this.data.dropshipFee;
                this.data.total2 = this.data.total;
            }
        } else {
            this.data.dropname = '';
            this.data.dropphone = '';
            this.data.isValidDropPhone = false;
            this.data.isInvalidDropPhone = false;
            if (this.data.total !== (this.data.costofGoods + this.data.dropshipFee)) {
                this.data.total = this.data.total - this.data.dropshipFee;
                this.data.total2 = this.data.costofGoods;
            } else {
                this.data.total = this.data.costofGoods;
                this.data.total2 = this.data.total;
            }
        }
    }

    public validPhone(ev: any) {
        const keyCode = (ev.keyCode ? ev.keyCode : ev.which);
        if ((keyCode < 48 || keyCode > 57) && (keyCode < 187 || keyCode > 189) && keyCode !== 46 && keyCode !== 8) {
            ev.preventDefault();
        }
    }

    public phoneValidation(ev: any) {
        if (this.data.phone) {
            if (this.data.phone.charAt(0) === '0' || '+') {
                if (this.data.phone.length > 3 && this.data.phone.length < 21) {
                    if (this.data.phone.substring(0, 4) === '+628' || this.data.phone.substring(0, 2) === '08') {
                        if (this.data.phone.length < 6) {
                            this.data.isValidPhone = false;
                            this.data.isInvalidPhone = true;
                        } else {
                            this.data.isValidPhone = true;
                            this.data.isInvalidPhone = false;
                        }
                    } else {
                        this.data.isValidPhone = false;
                        this.data.isInvalidPhone = true;
                    }
                } else {
                    this.data.isValidPhone = false;
                    this.data.isInvalidPhone = true;
                }
            } else {
                this.data.isValidPhone = false;
                this.data.isInvalidPhone = true;
            }
        }
    }

    public dropPhoneValidation(ev: any) {
        if (this.data.dropphone) {
            if (this.data.dropphone.charAt(0) === '0' || '+') {
                if (this.data.dropphone.length > 3 && this.data.dropphone.length < 21) {
                    if (this.data.dropphone.substring(0, 4) === '+628' || this.data.dropphone.substring(0, 2) === '08') {
                        if (this.data.dropphone.length < 6) {
                            this.data.isValidDropPhone = false;
                            this.data.isInvalidDropPhone = true;
                        } else {
                            this.data.isValidDropPhone = true;
                            this.data.isInvalidDropPhone = false;
                        }
                    } else {
                        this.data.isValidDropPhone = false;
                        this.data.isInvalidDropPhone = true;
                    }
                } else {
                    this.data.isValidDropPhone = false;
                    this.data.isInvalidDropPhone = true;
                }
            } else {
                this.data.isValidDropPhone = false;
                this.data.isInvalidDropPhone = true;
            }
        }
    }

    public back() {
        if (this.data.backText === 'delivery') {
            // $('#step3').hide();
            // $('#step2').hide();
            // $('#step1').show();
            this.data.step1 = true;
            this.data.step2 = false;
            this.data.step3 = false;
            this.data.backText = 'cart';
        }
        if (this.data.backText === 'end') {
            // $('#step2').show();
            // $('#step3').hide();
            // $('#step1').hide();
            this.data.step1 = false;
            this.data.step2 = true;
            this.data.step3 = false;
            this.data.backText = 'delivery';
        }
        this.data.lastState = false;
    }

    public backHome() {
        // $('#step1').show();
        // $('#step2').hide();
        // $('#step3').hide();
        this.data = {backText: 'cart', isValidPhone: false, isInvalidPhone: false, name: '', phone: '', isValidDropPhone: false,
            isInvalidDropPhone: false, dropphone: '', dropname: '', counter: 0, address: '', isValidAddress: false, isDropship: false,
            costofGoods: 500000, total: 500000, total2: 500000, dropshipFee: 5900, isActive1: true, isActive2: false, isActive3: false,
            isGosend: false, isJne: false, isCourier: false, gosend: 15000, jne: 9000, courier: 29000, ewallet: false, transfer: false,
            virtual: false, buttonText: 'Continue to Payment', lastState: false, orderId: '', step1: true, step2: false, step3: false};
        localStorage.removeItem('currentState');
    }

    public payment(ev: any) {
        if (ev.srcElement.value.includes('Payment')) {
            if (this.data.name === '') {
                alert('Name must be fill');
                return;
            }
            if (this.data.isValidPhone === false) {
                alert('Phone number is wrong');
                return;
            }
            if (this.data.isValidAddress === true) {
                alert('Address must be fill and can\'t be more than 120 character');
                return;
            }
            if (this.data.isDropship === true) {
                if (this.data.dropname === '') {
                    alert('Dropship Name must be fill');
                    return;
                }
                if (this.data.isValidDropPhone === false) {
                    alert('Dropship Phone number is wrong');
                    return;
                }
            }
            // $('#step1').hide();
            // $('#step2').show();
            this.data.step1 = false;
            this.data.step2 = true;
            this.data.step3 = false;
            this.data.isActive2 = true;
            this.data.backText = 'delivery';
        }
        if (ev.srcElement.value.includes('with')) {
            if (this.data.isGosend === false && this.data.isJne === false && this.data.isCourier === false) {
                alert('Shipment must be choose');
                return;
            }
            // $('#step1').hide();
            // $('#step2').hide();
            // $('#step3').show();
            this.data.step1 = false;
            this.data.step2 = false;
            this.data.step3 = true;
            this.data.backText = 'end';
            this.data.isActive3 = true;
            this.data.lastState = true;
            const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXTZabcdefghklmnpqrstuvwxyz';
            const stringLength = 5;
            let randomstring = '';
            for (let i = 0; i < stringLength; i++) {
                const rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum, rnum + 1);
            }
            this.data.orderId = randomstring;
        }
        const dataSave = JSON.stringify({backText: this.data.backText, isValidPhone: this.data.isValidPhone, isInvalidPhone: this.data.isInvalidPhone,
            name: this.data.name, phone: this.data.phone, isValidDropPhone: this.data.isValidDropPhone, isInvalidDropPhone: this.data.isInvalidDropPhone,
            dropphone: this.data.dropphone, dropname: this.data.dropname, counter: this.data.counter, address: this.data.address, isValidAddress: this.data.isValidAddress,
            isDropship: this.data.isDropship, costofGoods: this.data.costofGoods, total: this.data.total, total2: this.data.total2, dropshipFee: this.data.dropshipFee,
            isActive1: this.data.isActive1, isActive2: this.data.isActive2, isActive3: this.data.isActive3, isGosend: this.data.isGosend, isJne: this.data.isJne,
            isCourier: this.data.isCourier, gosend: this.data.gosend, jne: this.data.jne, courier: this.data.courier, ewallet: this.data.ewallet, transfer: this.data.transfer,
            virtual: this.data.virtual, buttonText: this.data.buttonText, lastState: this.data.lastState, orderId: this.data.orderId, step1: this.data.step1, step2: this.data.step2, step3: this.data.step3});
        localStorage.setItem('currentState', dataSave);
    }

    public chooseShipment(ev: any) {
        if (ev.srcElement.id === 'gosend') {
            this.data.isGosend = true;
            this.data.isJne = false;
            this.data.isCourier = false;
            this.data.total = this.data.total2 + this.data.gosend;
        }
        if (ev.srcElement.id === 'jne') {
            this.data.isGosend = false;
            this.data.isJne = true;
            this.data.isCourier = false;
            this.data.total = this.data.total2 + this.data.jne;
        }
        if (ev.srcElement.id === 'courier') {
            this.data.isGosend = false;
            this.data.isJne = false;
            this.data.isCourier = true;
            this.data.total = this.data.total2 + this.data.courier;
        }
    }

    public choosePayment(ev: any) {
        if (ev.srcElement.id === 'ewallet') {
            this.data.ewallet = true;
            this.data.transfer = false;
            this.data.virtual = false;
            this.data.buttonText = 'Pay with e-Wallet';
        }
        if (ev.srcElement.id === 'transfer') {
            this.data.ewallet = false;
            this.data.transfer = true;
            this.data.virtual = false;
            this.data.buttonText = 'Pay with Bank Transfer';
        }
        if (ev.srcElement.id === 'virtual') {
            this.data.ewallet = false;
            this.data.transfer = false;
            this.data.virtual = true;
            this.data.buttonText = 'Pay with Virtual Account';
        }
    }
}
</script>
