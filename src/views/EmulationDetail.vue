<template>
    <div class="detail-popup">
        <!-- :style="{top: topDrop +'px', left: leftDrop +'px'}" -->
        <div class="popup-modal" @mousedown="mouseDown" @mouseup="mouseUp" @mousemove="mousemove">
            <div class="ms-popup">
                <div class="buttons">
                    <div class="ms-popup-button">
                        <div class="btn-pop">
                            <div class="mi mi-24 mi-help"></div>
                            <span class="tooltip-text" id="top-2">
                                {{ $t("HelpText") }}
                            </span>
                        </div>
                    </div>
                    <div class="ms-popup-button">
                        <div class="btn-pop icon-close-popup" @click="closeEmulationDetail">
                            <span class="tooltip-text" id="top-3">
                                {{ $t("CloseText") }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="popup-header">{{ EditMode == 0 ? $t("AddEmulationText") : $t("EditEmulationText") }}</div>
                <div class="popup-content">
                    <div class="w-100 h-100 flex-1 flex-column">
                        <div class="form-group slide-detail">
                            <label class="form-group-label flex">
                                {{ $t("EmulationNameText") }}
                                <span class="text-red">&nbsp; *</span>
                            </label>
                            <div class="flex-1">
                                <div class="ms-input ms-editor w-100">
                                    <div class="flex-row border align-items-center"
                                        :class="{ 'error-border': errorList.EmulationName }">
                                        <input type="text" class="ms-input-item flex-1" tabindex="1"
                                            ref="refEmulationName" v-model="emulation.EmulationName"
                                            @input="inputEmulationName">
                                        <div class="mi-24 mi mi-close m-r-6" @click="clearText(0)"
                                            v-if="emulation.EmulationName"></div>
                                    </div>
                                    <div class="error-text" v-if="errorList.EmulationName">{{ $t("EmulationNameEmpty")
                                    }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group flex slide-detail">
                            <div class="flex-1 m-r-10">
                                <label class="form-group-label flex">
                                    {{ $t("EmulationCodeText") }}
                                    <span class="text-red">&nbsp; *</span>
                                </label>
                                <div class="flex-1">
                                    <div class="ms-input ms-editor w-100">
                                        <div class="flex-row border align-items-center "
                                            :class="{ 'error-border': errorList.EmulationCode }">
                                            <input type="text" class="ms-input-item flex-1" tabindex="2"
                                                v-model="emulation.EmulationCode" @input="inputEmulationCode">
                                            <div class="mi-24 mi mi-close m-r-6" @click="clearText(1)"
                                                v-if="emulation.EmulationCode"></div>
                                        </div>
                                        <div class="error-text" v-if="errorList.EmulationCode">{{
                                                $t("EmulationCodeEmpty")
                                        }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 m-r-10">
                                <label class="form-group-label flex">
                                    {{ $t("ApplyObjectText") }}
                                    <span class="text-red">&nbsp; *</span>
                                </label>
                                <div class="flex-row flex-center checkbox-group">
                                    <div class="flex-1">
                                        <label class="text-black ms-checkbox ms-editor">
                                            <input type="checkbox" class="ms-checkbox-control" tabindex="3" value="1"
                                                v-model="applyObject" @change="changeApplyObject">
                                            <span class="checkmark"></span>
                                            <span class="ms-checkbox--text text-black">
                                                {{ $t("IndividualText") }}
                                            </span>
                                        </label>
                                    </div>
                                    <div class="flex-1">
                                        <label class="text-black ms-checkbox ms-editor">
                                            <input type="checkbox" class="ms-checkbox-control" tabindex="4" value="2"
                                                v-model="applyObject" @change="changeApplyObject">
                                            <span class="checkmark"></span>
                                            <span class="ms-checkbox--text text-black">
                                                {{ $t("GroupText") }}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="error-text" v-if="errorList.ApplyObject"> {{ $t("ApplyObjectEmpty") }}</div>
                            </div>
                        </div>
                        <div class="form-group flex slide-detail">
                            <div class="flex-1 m-r-10">
                                <label class="form-group-label flex">
                                    {{ $t("CommendationLevelNameText") }}
                                    <span class="text-red">&nbsp; *</span>
                                </label>
                                <div class="flex-1">
                                    <div class="ms-input ms-editor w-100">
                                        <div class="flex-row border "
                                            :class="{ 'error-border': errorList.CommendationLevelName }">
                                            <Dropdown :input-props="{ tabindex: '5' }" :editable="true"
                                                placeholder="Cho??n hi????n v????t khen th??????ng" autoOptionFocus
                                                v-model="emulation.CommendationLevelID" :options="options"
                                                option-label="CommendationLevelName" panelClass="combo-dropdown-panel"
                                                @change="changeCommendationLevelName"
                                                option-value="CommendationLevelID" />
                                        </div>
                                    </div>
                                    <div class="error-text" v-if="errorList.CommendationLevelName">
                                        {{ $t("CommendationLevelNameEmpty") }} </div>
                                </div>
                            </div>
                            <div class="flex-1 m-r-10">
                                <label class="form-group-label flex">
                                    {{ $t("MovementTypeTextApply") }}
                                    <span class="text-red">&nbsp; *</span>
                                </label>
                                <div class="flex-row flex-center checkbox-group">
                                    <div class="flex-1">
                                        <label class="text-black ms-checkbox ms-editor">
                                            <input type="checkbox" class="ms-checkbox-control" tabindex="6"
                                                v-model="movementType" value="2" @change="changeMovementType">
                                            <span class="checkmark"></span>
                                            <span class="ms-checkbox--text text-black">
                                                {{ $t("FrequentText") }}
                                            </span>
                                        </label>
                                    </div>
                                    <div class="flex-1">
                                        <label class="text-black ms-checkbox ms-editor">
                                            <input type="checkbox" class="ms-checkbox-control" tabindex="7"
                                                v-model="movementType" value="1" @change="changeMovementType">
                                            <span class="checkmark"></span>
                                            <span class="ms-checkbox--text text-black">
                                                {{ $t("BatchedText") }}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="error-text" v-if="errorList.MovementType"> {{ $t("MovementTypeEmpty") }}
                                </div>
                            </div>
                        </div>
                        <div class="form-group flex slide-detail">
                            <div class="flex-1 m-r-10">
                                <label class="form-group-label flex">
                                    {{ $t("NoteText") }}
                                </label>
                                <div class="flex-1">
                                    <div class="ms-textarea ms-editor">
                                        <div class="flex-row border">
                                            <textarea rows="4" placeholder="Nh???p ghi ch??"
                                                class="ms-textarea-item flex-1" tabindex="8"
                                                v-model="emulation.Note"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group slide-detail" v-if="EditMode == 1">
                            <label class="form-group-label flex">
                                {{ $t("StatusText") }}
                            </label>
                            <div class="flex-row">
                                <div class="flex-1">
                                    <label class="ms-radio">
                                        <input type="radio" name="MsRadio_Inactive" v-model="emulation.Status" value=1
                                            @change="changeStatus">
                                        <span class="checkmark"></span>
                                        <span class="ms-radio--text text-black pointer">
                                            {{ $t("UseText") }}
                                        </span>
                                    </label>
                                </div>
                                <div class="flex-1">
                                    <label class="ms-radio">
                                        <input type="radio" name="MsRadio_Inactive" v-model="emulation.Status" value=0
                                            @change="changeStatus">
                                        <span class="checkmark"></span>
                                        <span class="ms-radio--text text-black pointer">
                                            {{ $t("StopUsingText") }}
                                        </span>
                                    </label>
                                </div>
                                <div class="flex-1"></div>
                                <div class="flex-1"></div>
                                <div class="flex-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popup-footer">
                    <div class="flex-row">
                        <div class="flex-1"></div>
                        <div class="flex-rtl" v-if="EditMode === 0">
                            <div class=" positon-relative">
                                <button class="ms-button btn btn-primary pointer" tabindex="9"
                                    @click="btnAddOnClick(0)">
                                    {{ $t("SaveText") }}
                                </button>
                                <span class="tooltip-text" id="top-5">Ctrl + S</span>
                            </div>
                            <div class=" positon-relative">
                                <button class="ms-button btn primary-outline m-r-10 pointer" tabindex="10"
                                    @click="btnAddOnClick(1)">
                                    <div class="btn-text">
                                        {{ $t("SaveAndAddText") }}
                                    </div>
                                </button>
                                <span class="tooltip-text" id="top-4">Ctrl + Shift + S</span>
                            </div>
                            <div class=" positon-relative">
                                <button class="ms-button btn m-r-10 btn-secondary" tabindex="11"
                                    @click="closeEmulationDetail">
                                    <div class="btn-text">
                                        {{ $t("CancelText") }}
                                    </div>
                                </button>

                            </div>
                        </div>
                        <div class="flex-rtl" v-else>
                            <div class=" positon-relative">
                                <button class="ms-button btn btn-primary pointer" tabindex="9"
                                    @click="btnAddOnClick(0)">
                                    {{ $t("SaveText") }}
                                </button>
                                <span class="tooltip-text" id="top-5">Ctrl + S</span>
                            </div>
                            <div class=" positon-relative">
                                <button class="ms-button btn m-r-10 btn-secondary" tabindex="11"
                                    @click="closeEmulationDetail">
                                    <div class="btn-text">
                                        {{ $t("CancelText") }}
                                    </div>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getCommendationLevel, insertEmulation, getNewEmulationCode, updateEmulation } from '@/api/link';
import Dropdown from 'primevue/dropdown';
export default {
    components: {
        Dropdown,
    },
    data() {
        return {
            topDrop: 0,
            leftDrop: 0,
            isDown: false,
            top: '',
            left: '',
            isMessage: false,
            applyObject: [],
            movementType: [],
            emulation: {},
            generateCode: 0,
            test: '142cb08f-7c31-21fa-8e90-67245e8b283e',
            options: [],
            errorList: {},
        }
    },
    props: {
        EditMode: {
            type: Number,
            default: 0
        },
        emulationSelected: {
            type: Object
        }
    },
    methods: {
        /**
         * click icon ??o??ng tr??n form
         * author: DPQuy (13/11/2022)
         * **/
        closeEmulationDetail() {
            //go??i ha??m ??o??ng form ???? EmulationList
            this.$emit("showEmulationDetail");
        },



        /**
         * s???? ki????n checked checkbox ??????i t??????ng khen th??????ng
         * 1.N????u ko co?? ??????i t??????ng na??o ????????c check thi?? hi????n thi?? 
         * ca??nh ba??o ke??m border ca??nh ba??o
         * 2.N????u co?? thi?? ????n
         * author:DPQuy(13/11/2022)
         * **/
        changeApplyObject() {
            this.changeEventCommon(this.applyObject.length, "ApplyObject")
        },
        /**
         *ha??m chung cho s???? ki????n thay ??????i gia?? tri??
         *checkbox
         *author:DPQuy(13/11/2022)
         * **/
        changeEventCommon(lengthProp, nameError) {
            if (lengthProp === 0) {
                this.errorList[nameError] = true;
            }
            else {
                this.errorList[nameError] = false;
            }
        },
        /**
         * s???? ki????n thay ??????i gia?? tri?? Loa??i phong tra??o
         * 1.N????u ko co?? thi?? hi????n ca??nh ba??o
         * 2.N????u co?? thi?? ????n
         * **/
        changeMovementType() {
            this.changeEventCommon(this.movementType.length, "MovementType");
        },
        /**
         * ha??m clear text khi nh????n va??o icon 
         * x tr??n input
         * author:DPQuy(13/11/2022)
         * **/
        clearText(mode) {
            if (mode == 0) {
                this.emulation.EmulationName = '';
                //hi????n ca??nh ba??o khi text r????ng
                this.inputEmulationName();

            }
            else {
                this.emulation.EmulationCode = '';
                //hi????n ca??nh ba??o khi text r????ng
                this.inputEmulationCode();
                //cho phe??p sinh ma?? theo t??n
                this.generateCode = 0;
            }
        },


        /**
         * b????t s???? ki????n nh????p input 
         * t??n danh hi????u
         * author:DPQuy (13/11/2022)
         * **/
        inputEmulationName() {
            this.inputEventCommon(this.emulation.EmulationName, "EmulationName")
            this.generateEmulationCode(this.emulation.EmulationName, this.generateCode);

            this.inputEventCommon(this.emulation.EmulationCode, "EmulationCode");
        },
        /**
         * Ha??m sinh ma?? danh hi????u theo t??n danh hi????u
         * author:DPQuy (13/11/2022)
         * **/
        generateEmulationCode(name, mode) {
            //cho phe??p sinh ma?? theo t??n
            if (mode == 0) {
                //xo??a khoa??ng tr????ng th????a trong chu????i VD: ??inh     Phu?? Quy?? => ??inh Phu?? QUy??
                var stringSplit = String(name).replace(/\s+/g, ' ').trim().split(' ');
                this.emulation.EmulationCode = '';
                //l????y ra ch???? ca??i ??????u ti??n t????ng ph????n t????
                for (let i = 0; i < stringSplit.length; i++) {
                    this.emulation.EmulationCode += stringSplit[i].toUpperCase().charAt(0);
                }
            }
        },
        /**
         * ha??m chung cho s???? ki????n nh????p input
         * author:DPQuy(13/11/2022)
         * **/
        inputEventCommon(namePro, nameError) {

            if (!namePro.trim()) {
                this.errorList[nameError] = true;
            }
            else {
                this.errorList[nameError] = false;
            }
        },
        /**
         * s???? ki????n nh????p input ma?? danh hi????u
         * author:DPQuy(13/11/2022)
         * **/
        inputEmulationCode() {
            this.inputEventCommon(this.emulation.EmulationCode, "EmulationCode");
            if (!this.emulation.EmulationCode) {
                //ko t???? ??????ng generate theo t??n 
                this.generateCode = 0;
            }
            else {
                //t???? ??????ng sinh ma?? theo t??n
                this.generateCode = 1
            }
        },
        changeCommendationLevelName() {
            this.errorList["CommendationLevelName"] = false;
        },
        filterComendationLevel(value) {
            console.log(value);
        },

        /***
         * ha??m validate d???? li????u
         * author:DPQuy(13/11/2022)
        */
        validateData() {
            try {
                if (!this.emulation.EmulationName) {
                    this.errorList["EmulationName"] = true;
                    return false;
                }
                else {
                    this.errorList["EmulationName"] = false;
                }

                if (!this.emulation.EmulationCode) {
                    this.errorList["EmulationCode"] = true;
                    return false;
                }
                else {
                    this.errorList["EmulationCode"] = false;
                }

                if (this.applyObject.length === 0) {
                    this.errorList["ApplyObject"] = true;
                    return false;
                }
                else {
                    this.errorList["ApplyObject"] = false;
                }


                if (!this.emulation.CommendationLevelID) {
                    this.errorList["CommendationLevelName"] = true;
                    return false;
                }
                else {
                    this.errorList["CommendationLevelName"] = false;
                }
                return true;
            } catch (error) {
                console.log(error);
            }

        },

        /**
         * hi????n thi?? th??ng ba??o l????i
         * author:DPQuy (13/11/2022)
         * **/
        showMessage() {
            this.isMessage = !this.isMessage;
        },

        /**
         * S???? ki????n thay ??????i gia?? tri?? status
         * author:DPQuy (13/11/2022)
         * **/
        changeStatus(event) {
            this.emulation.Status = Number(event.target.value);
        },
        /**
         * click va??o nu??t L??u 
         * author:DPQuy (13/11/2022)
         * **/
        btnAddOnClick(mode) {
            if (this.validateData()) {
                //l????y d???? li????u ra t???? form va?? th????c hi????n ga??n cho object emulation
                if (this.applyObject.length === 2) {
                    this.emulation.ApplyObject = 3;
                }
                else {
                    console.log(this.applyObject[0]);
                    this.emulation.ApplyObject = Number(this.applyObject[0]);
                }
                if (this.movementType.length === 2) {
                    this.emulation.MovementType = 3;
                }
                else {
                    this.emulation.MovementType = Number(this.movementType[0]);
                }

                var me = this;
                //th????c hi????n th??m m????i va?? ??o??ng form khi nh????n nu??t l??u
                if (mode == 0) {
                    //n????u form ??ang ???? ch???? ?????? th??m m????i thi?? go??i api th??m m????i
                    if (this.EditMode === 0) {
                        this.emulation.Status = 1;
                        console.log(me.emulation);
                        insertEmulation(me.emulation).then(res => {
                            //??o??ng form
                            this.$emit("showEmulationDetail");
                            //load la??i d???? li????u
                            this.$emit("loadData");
                            //n????i dung th??ng ba??o
                            this.$emit("showToast", "Th??m tha??nh c??ng")
                            console.log(res);
                        }).catch(error => {
                            //ki????m tra xem l????i co?? n????m trong l????i ??a?? validate ???? backend ko va?? co?? pha??i l????i ma?? tru??ng ko
                            if (error.response.data.data.erros.length !== 0 && error.response.data.data.erros[0] === 'M?? danh hi????u ???? t???n t???i trong h??? th???ng') {
                                // //hi????n thi?? ca??nh ba??o l????i

                                this.$emit("showMessage", 0, me.emulation);
                            }
                            console.log(error);
                        });
                    }
                    else {

                        updateEmulation(me.emulation).then(res => {
                            //??o??ng form
                            this.$emit("showEmulationDetail");
                            //load la??i d???? li????u
                            this.$emit("loadData");
                            //n????i dung th??ng ba??o
                            this.$emit("showToast", "L??u tha??nh c??ng")
                            console.log(res);
                        });
                        console.log('c????p nh????t');
                        console.log(this.emulation);
                    }

                    // axios.post(API.insertEmulation(), this.emulation).then(res => {
                    //     console.log(res);
                    // });
                }
                else {

                    console.log("L??u va?? reset la??i form");
                }
            }
            //th????c hi????n th??m m????i va?? reset form ?????? th??m m????i
            else {
                console.log("l????i");
            }
        },
        /**
        * b????t s???? ki????n khi click va??o form
        * 
        * **/
        mouseDown(event) {
            //true: ??ang click, false: kh??ng click
            this.isDown = true;
            //ti??nh toa??n vi?? tri?? nh????p chu????t th????c hi????n ke??o form di chuy????n
            this.top = this.topDrop - event.clientY;
            this.left = this.leftDrop - event.clientX;
        },
        /**
         * b????t s???? ki????n nh????c chu????t
         * author:DPQuy(13/11/2022)
         * **/
        mouseUp() {
            this.isDown = false;
        },
        /***
         * S???? ki????n ke??o va?? di chuy????n form
         * author: DPQuy(13/11/2022)
         * **/
        mousemove(event) {
            //n????u ??ang nh????p chu????t va?? ke??o thi?? di chuy????n form theo vi?? tri?? ke??o
            if (this.isDown) {
                this.topDrop = event.clientY + this.top;
                this.leftDrop = event.clientX + this.left;
            }
        }

    },

    async created() {
        /**
         * go??i api l????y danh sa??ch ca??c c????p khen th??????ng
         * **/
        var me = this;
        await getCommendationLevel().then(res => {
            me.options = res;
        });
        // axios.get(API.getCommendationLevel()).then(res => {
        //     me.options = res.data;
        // })


        //Ki????m tra xem form ??ang ???? ch???? ?????? chi??nh
        //s????a hay th??m m????i
        //1.chi??nh s????a
        //0.th??m m????i
        if (this.EditMode == 0) {
            console.log(this.EditMode);
            //se??t gia?? tri?? m????c ??i??nh cho ??????i t??????ng khen th??????ng 
            this.applyObject.push(1);


            console.log(this.options);
            //se??t gia?? tri?? m????c ??i??nh cho c????p khen th??????ng
            this.emulation.CommendationLevelID = this.options[0].CommendationLevelID;

            //se??t gia?? tri?? m????c ??i??nh cho loa??i phong tra??o
            this.movementType.push(2);

            getNewEmulationCode().then(res => {
                me.emulation.EmulationCode = res;
            })

            // axios.get(API.getNewEmulationCode()).then(res => {
            //     me.emulation.EmulationCode = res.data;
            // })
        }
        else {
            //l????y ra object c????n chi??nh s????a
            this.emulation = { ...this.emulationSelected };
            console.log(this.emulationSelected.Status);
            //ki????m tra gia?? tri?? ??????i t??????ng va?? ga??n l??n form
            //1.Ca?? nh??n
            //2.T????p th????
            //3.T????p th???? va?? ca?? nh??n
            if (this.emulation.ApplyObject == 3) {
                this.applyObject.push(1, 2);
            }
            else {
                this.applyObject.push(this.emulation.ApplyObject)
            }


            //ki????m tra gia?? tri?? loa??i phong tra??o
            //1.Theo ??????t
            //2.Th??????ng xuy??n
            //3.Th??????ng xuy??n, theo ??????t
            if (this.emulation.MovementType == 3) {
                this.movementType.push(1, 2);
            }
            else {
                this.movementType.push(this.emulation.MovementType);
            }

        }





        /**
         * Th??m c??c s??? ki???n t??? b??n ph??m
         * author: DPQuy (6/7/2022)
         * **/
        window.addEventListener('keydown', (e) => {
            //nh???n esc ????? ????ng form
            if (e.key == 'Escape') {
                e.preventDefault();
                this.closeEmulationDetail();
            }

            //ki????m tra ????n nu??t ctrl
            var isCtrl = false;
            if (e.key == 'Control') {
                e.preventDefault();
                isCtrl = true;
            }
            if (e.key == 'q') {
                alert('q')
            }
            //????n ??????ng th????i ctrl + S
            if (e.key == 'q' && isCtrl) {
                e.preventDefault();
                alert('ctrl+q')
            }

            // console.log(e);
        });

        //focus va??o ?? nh????p li????u ??????u ti??n
        this.$nextTick(() => {
            this.$refs.refEmulationName.focus();
        })
    },

    watch: {
        // 'emulation.CommendationLevelName': function () {
        //     alert(1)
        // }
    }
}
</script>

<style>
@import url(../css/views/emulationdetail.css);
</style>