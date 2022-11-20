<template>
    <div class="m-message">
        <div class="ms-mesage-box">
            <div class="close-button mi mi-24 mi-close" @click="closeMessage"></div>
            <div class="message-header">
                <div class="content">
                    <div class="icon-message">
                        <div class="mi mi-52 mi-exclamation-error-48-2"></div>
                    </div>
                    <div class="message-content p-l-16">
                        <div class="message-title">{{ messageMode == 0 ? 'MISA CeGov' : 'Xóa danh hiệu thi đua' }}
                        </div>
                        <span class="message-main" id="idMessage">
                            {{ messageMode == 0 ? `Mã danh hiệu thi đua ${emulationSelected.EmulationCode} đã tồn tại
                                                        trong danh
                                                        sách.Xin vui lòng kiểm tra lại.`
                                    : `Bạn có chắc chắn muốn xóa Danh hiệu thi đua ${emulationSelected.EmulationCode} đã
                                                        chọn không?`
                            }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="mess-footer" v-if="messageMode == 1">
                <div class="float-right mess-footer-box ">
                    <button class="btn w-100 btn-danger pointer" @click="acceptDeleteEmulation">
                        <div class="btn-text">Xóa danh hiệu</div>
                    </button>
                </div>
                <div class="float-right mess-footer-box">
                    <button class="ms-button btn btn-secondary" @click="closeMessage">Không</button>
                </div>
            </div>
            <div class="mess-footer" v-else>
                <div class="float-right mess-footer-box ">
                    <button class="btn w-100 btn-danger pointer" @click="closeMessage">
                        <div class="btn-text">Đóng</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { loadData, deleteEmulation } from '@/api/link';
export default {
    props: {
        emulationSelected: {
            type: Object
        },
        messageMode: {
            type: Number
        }
    },
    data() {
        return {
        }
    },
    methods: {
        /**
         * Đóng form message
         * author:DPQuy (13/11/2022)
         * **/
        closeMessage() {
            this.$emit("showMessage")
        },
        /**
         * click nút xóa danh hiệu
         * author:DPQuy (13/11/2022)
         * **/
        acceptDeleteEmulation() {
            var me = this;
            deleteEmulation(this.emulationSelected.EmulationID).then(res => {
                me.$emit("loadData");
                me.$emit("showToast", 'Xóa thành công');
                me.$emit("showMessage");
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>
<style>
@import url(../../css/base/message.css);
</style>