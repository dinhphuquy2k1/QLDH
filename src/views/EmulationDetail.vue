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
                                                placeholder="Chọn hiện vật khen thưởng" autoOptionFocus
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
                                            <textarea rows="4" placeholder="Nhập ghi chú"
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
         * click icon đóng trên form
         * author: DPQuy (13/11/2022)
         * **/
        closeEmulationDetail() {
            //gọi hàm đóng form ở EmulationList
            this.$emit("showEmulationDetail");
        },



        /**
         * sự kiện checked checkbox Đối tượng khen thưởng
         * 1.Nếu ko có đối tượng nào được check thì hiển thị 
         * cảnh báo kèm border cảnh báo
         * 2.Nếu có thì ẩn
         * author:DPQuy(13/11/2022)
         * **/
        changeApplyObject() {
            this.changeEventCommon(this.applyObject.length, "ApplyObject")
        },
        /**
         *hàm chung cho sự kiện thay đổi giá trị
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
         * sự kiện thay đổi giá trị Loại phong trào
         * 1.Nếu ko có thì hiển cảnh báo
         * 2.Nếu có thì ẩn
         * **/
        changeMovementType() {
            this.changeEventCommon(this.movementType.length, "MovementType");
        },
        /**
         * hàm clear text khi nhấn vào icon 
         * x trên input
         * author:DPQuy(13/11/2022)
         * **/
        clearText(mode) {
            if (mode == 0) {
                this.emulation.EmulationName = '';
                //hiện cảnh báo khi text rỗng
                this.inputEmulationName();

            }
            else {
                this.emulation.EmulationCode = '';
                //hiện cảnh báo khi text rỗng
                this.inputEmulationCode();
                //cho phép sinh mã theo tên
                this.generateCode = 0;
            }
        },


        /**
         * bắt sự kiện nhập input 
         * tên danh hiệu
         * author:DPQuy (13/11/2022)
         * **/
        inputEmulationName() {
            this.inputEventCommon(this.emulation.EmulationName, "EmulationName")
            this.generateEmulationCode(this.emulation.EmulationName, this.generateCode);

            this.inputEventCommon(this.emulation.EmulationCode, "EmulationCode");
        },
        /**
         * Hàm sinh mã danh hiệu theo tên danh hiệu
         * author:DPQuy (13/11/2022)
         * **/
        generateEmulationCode(name, mode) {
            //cho phép sinh mã theo tên
            if (mode == 0) {
                //xóa khoảng trắng thừa trong chuỗi VD: Đinh     Phú Quý => Đinh Phú QUý
                var stringSplit = String(name).replace(/\s+/g, ' ').trim().split(' ');
                this.emulation.EmulationCode = '';
                //lấy ra chữ cái đầu tiên từng phần tử
                for (let i = 0; i < stringSplit.length; i++) {
                    this.emulation.EmulationCode += stringSplit[i].toUpperCase().charAt(0);
                }
            }
        },
        /**
         * hàm chung cho sự kiện nhập input
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
         * sự kiện nhập input mã danh hiệu
         * author:DPQuy(13/11/2022)
         * **/
        inputEmulationCode() {
            this.inputEventCommon(this.emulation.EmulationCode, "EmulationCode");
            if (!this.emulation.EmulationCode) {
                //ko tự động generate theo tên 
                this.generateCode = 0;
            }
            else {
                //tự động sinh mã theo tên
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
         * hàm validate dữ liệu
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
         * hiển thị thông báo lỗi
         * author:DPQuy (13/11/2022)
         * **/
        showMessage() {
            this.isMessage = !this.isMessage;
        },

        /**
         * Sự kiện thay đổi giá trị status
         * author:DPQuy (13/11/2022)
         * **/
        changeStatus(event) {
            this.emulation.Status = Number(event.target.value);
        },
        /**
         * click vào nút Lưu 
         * author:DPQuy (13/11/2022)
         * **/
        btnAddOnClick(mode) {
            if (this.validateData()) {
                //lấy dữ liệu ra từ form và thực hiện gán cho object emulation
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
                //thực hiện thêm mới và đóng form khi nhấn nút lưu
                if (mode == 0) {
                    //nếu form đang ở chế độ thêm mới thì gọi api thêm mới
                    if (this.EditMode === 0) {
                        this.emulation.Status = 1;
                        console.log(me.emulation);
                        insertEmulation(me.emulation).then(res => {
                            //đóng form
                            this.$emit("showEmulationDetail");
                            //load lại dữ liệu
                            this.$emit("loadData");
                            //nội dung thông báo
                            this.$emit("showToast", "Thêm thành công")
                            console.log(res);
                        }).catch(error => {
                            //kiểm tra xem lỗi có nằm trong lỗi đã validate ở backend ko và có phải lỗi mã trùng ko
                            if (error.response.data.data.erros.length !== 0 && error.response.data.data.erros[0] === 'Mã danh hiệu đã tồn tại trong hệ thống') {
                                // //hiển thị cảnh báo lỗi

                                this.$emit("showMessage", 0, me.emulation);
                            }
                            console.log(error);
                        });
                    }
                    else {

                        updateEmulation(me.emulation).then(res => {
                            //đóng form
                            this.$emit("showEmulationDetail");
                            //load lại dữ liệu
                            this.$emit("loadData");
                            //nội dung thông báo
                            this.$emit("showToast", "Lưu thành công")
                            console.log(res);
                        });
                        console.log('cập nhật');
                        console.log(this.emulation);
                    }

                    // axios.post(API.insertEmulation(), this.emulation).then(res => {
                    //     console.log(res);
                    // });
                }
                else {

                    console.log("Lưu và reset lại form");
                }
            }
            //thực hiện thêm mới và reset form để thêm mới
            else {
                console.log("lỗi");
            }
        },
        /**
        * bắt sự kiện khi click vào form
        * 
        * **/
        mouseDown(event) {
            //true: đang click, false: không click
            this.isDown = true;
            //tính toán vị trí nhấp chuột thực hiện kéo form di chuyển
            this.top = this.topDrop - event.clientY;
            this.left = this.leftDrop - event.clientX;
        },
        /**
         * bắt sự kiện nhấc chuột
         * author:DPQuy(13/11/2022)
         * **/
        mouseUp() {
            this.isDown = false;
        },
        /***
         * Sự kiện kéo và di chuyển form
         * author: DPQuy(13/11/2022)
         * **/
        mousemove(event) {
            //nếu đang nhấp chuột và kéo thì di chuyển form theo vị trí kéo
            if (this.isDown) {
                this.topDrop = event.clientY + this.top;
                this.leftDrop = event.clientX + this.left;
            }
        }

    },

    async created() {
        /**
         * gọi api lấy danh sách các cấp khen thưởng
         * **/
        var me = this;
        await getCommendationLevel().then(res => {
            me.options = res;
        });
        // axios.get(API.getCommendationLevel()).then(res => {
        //     me.options = res.data;
        // })


        //Kiểm tra xem form đang ở chế độ chỉnh
        //sửa hay thêm mới
        //1.chỉnh sửa
        //0.thêm mới
        if (this.EditMode == 0) {
            console.log(this.EditMode);
            //sét giá trị mặc định cho đối tượng khen thưởng 
            this.applyObject.push(1);


            console.log(this.options);
            //sét giá trị mặc định cho cấp khen thưởng
            this.emulation.CommendationLevelID = this.options[0].CommendationLevelID;

            //sét giá trị mặc định cho loại phong trào
            this.movementType.push(2);

            getNewEmulationCode().then(res => {
                me.emulation.EmulationCode = res;
            })

            // axios.get(API.getNewEmulationCode()).then(res => {
            //     me.emulation.EmulationCode = res.data;
            // })
        }
        else {
            //lấy ra object cần chỉnh sửa
            this.emulation = { ...this.emulationSelected };
            console.log(this.emulationSelected.Status);
            //kiểm tra giá trị đối tượng và gán lên form
            //1.Cá nhân
            //2.Tập thể
            //3.Tập thể và cá nhân
            if (this.emulation.ApplyObject == 3) {
                this.applyObject.push(1, 2);
            }
            else {
                this.applyObject.push(this.emulation.ApplyObject)
            }


            //kiểm tra giá trị loại phong trào
            //1.Theo đợt
            //2.Thường xuyên
            //3.Thường xuyên, theo đợt
            if (this.emulation.MovementType == 3) {
                this.movementType.push(1, 2);
            }
            else {
                this.movementType.push(this.emulation.MovementType);
            }

        }





        /**
         * Thêm các sự kiện từ bàn phím
         * author: DPQuy (6/7/2022)
         * **/
        window.addEventListener('keydown', (e) => {
            //nhấn esc để đóng form
            if (e.key == 'Escape') {
                e.preventDefault();
                this.closeEmulationDetail();
            }

            //kiểm tra ấn nút ctrl
            var isCtrl = false;
            if (e.key == 'Control') {
                e.preventDefault();
                isCtrl = true;
            }
            if (e.key == 'q') {
                alert('q')
            }
            //ấn đồng thời ctrl + S
            if (e.key == 'q' && isCtrl) {
                e.preventDefault();
                alert('ctrl+q')
            }

            // console.log(e);
        });

        //focus vào ô nhập liệu đầu tiên
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