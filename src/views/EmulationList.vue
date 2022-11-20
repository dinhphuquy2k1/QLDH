<template>
    <div class="main-view flex-column">
        <div class="flex-column form-list h-100 flex-1">
            <div class="flex-column h-100 flex-1">
                <div class="flex-row title-box">
                    <div class="list-title flex">
                        {{ $t("EmulationText") }}
                    </div>
                </div>
                <div class="flex-row toolbar-box">
                    <div class="left-toolbar flex-row">
                        <div class="m-input ms-editor search-box m-r-10">
                            <div class="flex-row border flex align-items-center">
                                <input type="text" class="ms-editor ms-input-item flex-1 input-search"
                                    placeholder="Nhập mã hoặc tên danh hiệu" v-model="txtSearch"
                                    @input="searchInput" @keydown.enter="keydownSearch">
                                <div class="mi-24 mi mi-close m-r-6" @click="clearText" v-if="txtSearch"></div>
                                <div class="icon-search mi-24 mi positon-relative"></div>
                            </div>
                        </div>
                        <div class="filter-group">
                            <div class="flex-row">
                                <button class="ms-button btn btn-filter btn-secondary m-r-10" @click="btnFilterOnClick">
                                    <div class="mi mi-24 mi-filter"></div>
                                    <div class="pl-0 btn-text">
                                        {{ $t("FilterText") }}

                                    </div>
                                </button>
                            </div>
                            <div class="filter-box" style="right: 23px; width: 360px;" v-if="isShowFilterBox">
                                <span class="custom-arrow" style="right: 2px;"></span>
                                <div class="box-header">
                                    <span class="box-header-title">
                                        <span class="box-header-title">Lọc danh hiệu</span>
                                    </span>
                                    <span class="mi-24 mi mi-close" @click="showFilterBox"></span>
                                </div>
                                <div class="box-content flex-column">
                                    <div class="form-group">
                                        <label>Đối tượng khen thưởng</label>
                                        <div class="flex-1 m-t-10">
                                            <div class="ms-combobox ms-editor input-editor">
                                                <div class="flex-row border combo-box-input">
                                                    <Dropdown />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Cấp khen thưởng</label>
                                        <div class="flex-1 m-t-10">
                                            <div class="ms-combobox ms-editor input-editor">
                                                <div class="flex-row border combo-box-input">
                                                    <Dropdown />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Loại phong trào</label>
                                        <div class="flex-1 m-t-10">
                                            <div class="ms-combobox ms-editor input-editor">
                                                <div class="flex-row border combo-box-input">
                                                    <Dropdown />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Trạng thái</label>
                                        <div class="flex-1 m-t-10">
                                            <div class="ms-combobox ms-editor input-editor">
                                                <div class="flex-row border combo-box-input">
                                                    <Dropdown />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="box-footer">
                                    <div class="right-content">
                                        <button class="ms-button btn m-r-10 btn-secondary" @click="showFilterBox">
                                            <div class="btn-text">
                                                {{ $t("CancelText") }}
                                            </div>
                                        </button>
                                        <button class="ms-button btn btn-primary pointer">
                                            <div class="btn-text">
                                                {{ $t("ApplyText") }}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1"></div>
                    <div class="right-toolbar flex-row">
                        <button class="btn btn-primary pointer" @click="btnAddEmulation(0, emulation)"
                            v-if="!isShowCheckActions">
                            <div class="mi-24 mi icon-add-white positon-relative mi-add-white"></div>
                            <div class="btn-text pl-0">Thêm danh hiệu</div>
                        </button>
                        <div class="action-multi flex-row" v-if="isShowCheckActions">
                            <div class="selected-count">Đã chọn
                                <strong>
                                    {{ EmulationIDs.length }}
                                </strong>
                            </div>
                            <div class="selected-all pointer de-selected m-l-20">Bỏ chọn</div>
                            <div class="action-container flex">
                                <div class="btn action flex-row primary-outline pointer">
                                    <div class="btn-text">
                                        {{ $t("UseText") }}
                                    </div>
                                </div>
                                <div class="btn action flex-row secondary-outline pointer">
                                    <div class="btn-text">
                                        {{ $t("StopUsingText") }}
                                    </div>
                                </div>
                                <div class="btn action flex-row secondary-outline-red pointer">
                                    <div class="btn-text">Xóa</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-column flex-1 list-content box">
                    <div class="ms-grid-viewer flex-1 flex-box flex-column">
                        <div class="ms-content--table flex-1 scroller">
                            <table class="m-table" cellpadding="0" cellspacing="0">
                                <thead class="m-thead">
                                    <tr class="m-tr tr-1">
                                        <th class="ms-th multiple-cell ms-checkbox sticky"
                                            :class="{ 'checkmark-temp': EmulationIDs.length !== 0 && !isSelectAll }">
                                            <input type="checkbox" class="ms-checkbox-control" v-model="isSelectAll"
                                                @change="changeCheckedAll">
                                            <span class="checkmark"></span>
                                        </th>
                                        <th class="ms-th" style="min-width: 310px; max-width: 310px;">
                                            <div class="ms-th-content flex-row">
                                                <div class="ms-th-title" title="Tên danh hiệu thi đua">{{
                                                        $t("EmulationNameText")
                                                }}</div>
                                                <div class="mi mi-16 mi-arrow-dropdown ml-5" style="display:none">
                                                </div>
                                            </div>
                                        </th>
                                        <th class="ms-th" style="width: 160px; max-width: 160px; min-width: 160px;">
                                            <div class="ms-th-content flex-row">
                                                <div class="ms-th-title" title="Mã danh hiệu">{{
                                                        $t("EmulationCodeText")
                                                }}</div>
                                                <div class="mi mi-16 mi-arrow-dropdown ml-5" style="display:none">
                                                </div>
                                            </div>
                                        </th>
                                        <th class="ms-th" style="width: 180px; max-width: 180px; min-width: 180px;">
                                            <div class="ms-th-content flex-row">
                                                <div class="ms-th-title" title="Đối tượng khen thưởng">
                                                    {{
                                                            $t("ApplyObjectText")
                                                    }}
                                                </div>
                                            </div>
                                        </th>
                                        <th class="ms-th" style="width: 200px; max-width: 200px; min-width: 200px;">
                                            <div class="ms-th-content flex-row">
                                                <div class="ms-th-title" title="Cấp khen thưởng">
                                                    {{ $t("CommendationLevelNameEmpty") }}
                                                </div>
                                            </div>
                                        </th>
                                        <th class="ms-th" style="width: 200px; max-width: 200px; min-width: 200px;">
                                            <div class="ms-th-content flex-row">
                                                <div class="ms-th-title" title="Loại phong trào">
                                                    {{ $t("MovementTypeText") }}
                                                </div>
                                            </div>
                                        </th>
                                        <th class="ms-th" style="width: 180px; max-width: 180px; min-width: 180px;">
                                            <div class="ms-th-content flex-row">
                                                <div class="ms-th-title" title="Trạng thái">{{ $t("StatusText") }}
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="m-tbody">
                                    <tr v-for="(emulation) in data" :key="emulation.EmulationID" class="ms-tr"
                                        v-on:mouseover="test" @mouseleave="moveleaveTr"
                                        @dblclick="btnAddEmulation(1, emulation)">
                                        <td @dblclick.stop="unDblClick" class="ms-td multiple-cell ms-checkbox sticky">
                                            <div class="flex-center">
                                                <!-- :value="emulation.EmulationID"  -->
                                                <input type="checkbox" class="ms-checkbox-control" selectedCheckbox
                                                    :id="emulation.EmulationID" v-model="EmulationIDs"
                                                    :value="emulation.EmulationID" @change="cbSingleStatus">
                                                <span class="checkmark"></span>

                                            </div>
                                        </td>
                                        <td style="max-width: 310px;" class="ms-td colEmulationName"
                                            :title="emulation.EmulationName">
                                            <div class="ms-td-col flex-row">
                                                <div class="ms-td-title">
                                                    {{ emulation.EmulationName }}
                                                </div>
                                            </div>
                                        </td>
                                        <td style="max-width: 160px;" class="ms-td" :title="emulation.EmulationCode">
                                            <div class="ms-td-col flex-row">
                                                <div class="ms-td-title">
                                                    {{ emulation.EmulationCode }}
                                                </div>
                                            </div>
                                        </td>
                                        <td style="max-width: 180px;" class="ms-td" :title="emulation.ApplyObject">
                                            <div class="ms-td-col flex-row">
                                                <div class="ms-td-title">
                                                    {{ emulation.ApplyObject == 1 ? $t("ApplyObject.Individual") :
                                                            emulation.ApplyObject == 2 ?
                                                                $t("ApplyObject.Group") : $t("ApplyObject.GroupAndIndi")
                                                    }}
                                                </div>
                                            </div>
                                        </td>
                                        <td style="max-width: 200px;" class="ms-td"
                                            :title="emulation.CommendationLevelName">
                                            <div class="ms-td-col flex-row">
                                                <div class="ms-td-title">
                                                    {{ emulation.CommendationLevelName }}
                                                </div>
                                            </div>
                                        </td>
                                        <td style="max-width: 200px;" class="ms-td" :title="emulation.MovementType">
                                            <div class="ms-td-col flex-row">
                                                <div class="ms-td-title">
                                                    {{ emulation.MovementType == 1 ? $t("MovementType.Batched") :
                                                            emulation.MovementType == 2 ?
                                                                $t("MovementType.Frequent") : $t("MovementType.FreAndBat")
                                                    }}
                                                </div>
                                            </div>
                                        </td>
                                        <td style="max-width: 180px;" class="ms-td"
                                            :title="emulation.Status == 1 ? 'Sử dụng' : 'Ngưng sử dụng'">
                                            <div class="ms-td-col flex-row">
                                                <div class="inactive-icon flex align-items-center">
                                                    <div class="icon-image"
                                                        :class="{ 'icon-not-active': emulation.Status == 0, 'icon-active': emulation.Status == 1 }">
                                                    </div>
                                                </div>
                                                <div class="ms-td-title">
                                                    {{ emulation.Status == 1 ? $t("UseText") :
                                                            $t("StopUsingText")
                                                    }}
                                                </div>
                                            </div>
                                        </td>
                                        <div class="row-actions" @dblclick.stop="unDbl">
                                            <div class="row-actions-item item-edit"
                                                @click="btnAddEmulation(1, emulation)">
                                                <div class="flex-center">
                                                    <div class="mi mi-24 mi-edit"></div>
                                                </div>
                                                <span class="tooltip-text" id="top">Sửa</span>
                                            </div>
                                            <div class="row-actions-item item-more" @click="showRowAction">
                                                <div class="flex-center">
                                                    <div class="mi mi-24 mi-more"></div>
                                                </div>
                                                <span class="tooltip-text" id="more-po">Thêm nữa...</span>
                                            </div>
                                            <div class="positon-relative">
                                                <ul class="v-context" v-if="isShowRowAction">
                                                    <li class="li-active" :class="{ 'disable': emulation.Status === 1 }"
                                                        @click="activeStatus(emulation)">
                                                        {{ $t("UseText") }}
                                                    </li>
                                                    <li @click="inactiveStatus(emulation)"
                                                        :class="{ 'disable': emulation.Status === 0 }"> {{
                                                                $t("StopUsingText")
                                                        }}</li>
                                                    <li class="text-red" @click="deleteEmulation(emulation)">
                                                        {{ $t("DeleteText") }}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="ms-pagination flex-row">
                            <div class="h-20 p-r-12 flex">
                                <div class="min-page-caption">
                                    {{ $t("SumText") }}
                                </div>
                                <div class="total">
                                    <span>{{ TotalRecord }}</span>
                                </div>
                                <div class="min-page-caption">
                                    {{ $t("RecordText") }}
                                </div>
                            </div>
                            <div class="flex-1"></div>
                            <div class="flex align-items-center">
                                <span>Số bản ghi/trang</span>
                                <div class="page-size ms-editor">
                                    <div class="flex-row border combo-box-input">
                                        <Dropdown :options="options" v-model="pageSize" @change="changePageSize" />
                                    </div>
                                </div>
                                <div class="flex h-16">
                                    <div class="m-r-6"><b>1</b></div>
                                    <div class="m-r-6">-</div>
                                    <div class="m-r-6"><b>20</b></div>
                                    <div>bản ghi</div>
                                </div>
                                <div class="flex">
                                    <div class="move prev" :class="{ 'disabled': pageIndex === 1 }" @click="prevPage">
                                    </div>
                                    <div class="move next " :class="{ 'disabled': pageIndex === TotalPage }"
                                        @click="nextPage"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <EmulationDetail v-if="isShowEmulationDetail" @showEmulationDetail="showEmulationDetail" :EditMode="EditMode"
        :emulationSelected="emulationSelected" @loadData="loadData" @showToast="showToast" @showMessage="showMessage" />
    <TheLoading v-if="isLoading" />
    <TheToast v-if="isToast" :toastContent="toastContent" />
    <TheMessage v-if="isMessage" @showMessage="showMessage" :messageMode="messageMode" @loadData="loadData"
        :emulationSelected="emulationSelected" @showToast="showToast" />
</template>

<script>
import TheMessage from '@/components/base/TheMessage.vue';
import TheToast from '@/components/base/TheToast.vue';
import { loadData, deleteEmulation, updateEmulation } from '@/api/link';
import TheLoading from '@/components/base/TheLoading.vue';
import Dropdown from 'primevue/dropdown';
import EmulationDetail from './EmulationDetail.vue';
export default {
    components: {
        EmulationDetail,
        Dropdown,
        TheLoading,
        TheToast,
        TheMessage
    },
    data() {
        return {
            txtSearch: '',
            isToast: false,
            toastContent: '',
            isMessage: false,
            messageMode: 0,
            isShowEmulationDetail: false,
            isShowRowAction: false,
            EditMode: 0,
            isLoading: false,
            isShowFilterBox: false,
            isShowCheckActions: false,
            emulationSelected: {},
            isSelectAll: false,
            isDelectAll: false,
            EmulationIDs: [],
            data: [],
            options: [10, 20, 50, 100],
            pageSize: 10,
            pageIndex: 1,
            TotalPage: 0,
            TotalRecord: 0,
        }
    },
    methods: {


        /**
         * click nút lọc
         * author: DPQuy(13/11/2022)
         * **/
        btnFilterOnClick() {
            //gọi hàm show filterbox
            this.showFilterBox();

        },

        /**
         * click checkbox trên từng tr
         * author: DPQuy (13/11/2022)
         * **/
        cbSingleStatus() {
            //hiển thị các acitons khi checkbox
            //nếu đang mở thì kiểm tra xem số lượng checkbox
            //bằng 0 thì đóng, khác 0 thì giữ nguyên
            //chỉ thay đổi số lượng
            if (this.isShowCheckActions) {
                if (this.EmulationIDs.length === 0) {
                    this.isShowCheckActions = false;
                }
            }
            else {
                this.isShowCheckActions = true;
            }
            //nếu số lượng các checkbox = số bản ghi
            //1. checkboxall = true
            //2. checkboxall = false
            if (this.EmulationIDs.length === this.data.length) {
                this.isSelectAll = true;
            }
            else {
                this.isSelectAll = false;
            }
        },
        /**
         * hàm toast thông báo
         * author:DPQuy (13/11/2022)
         * **/
        showToast(message) {
            clearTimeout();
            this.isToast = true;
            setTimeout(() => {
                this.isToast = false
            }, 3000)
            //nội dung thông báo
            this.toastContent = message;
        },
        /**
         * thay đổi số lượng bản ghi trên 1 trang
         * author:DPQuy (13/11/2022)
         * **/
        changePageSize() {
            this.loadData();
        },
        /**
         * click nút chuyển trang kế tiếp
         * author:DPQuy (13/11/2022)
         * **/
        nextPage() {
            if (this.pageIndex < this.TotalPage) {
                this.pageIndex = this.pageIndex + 1;
                this.isSelectAll = false;
                this.loadData();
            }
        },
        prevPage() {
            if (this.pageIndex > 1) {
                this.pageIndex = this.pageIndex - 1;
                this.loadData();
            }
        },

        /**
         * Xóa danh hiệu
         * **/
        deleteEmulation(emulation) {
            //gọi api xóa danh hiệu
            var me = this;
            this.showMessage(1, emulation);
            // deleteEmulation(id).then(res => {
            //     me.loadData();
            //     me.showToast('Xóa thành công');
            //     console.log(res);
            // }).catch(error => {
            //     console.log(error);
            // });
        },
        /**
         * Hàm show dialog cảnh báo
         * author:QPQuy (13/11/2022)
         * **/
        showMessage(messMode, eml) {
            this.isMessage = !this.isMessage;
            this.messageMode = messMode;
            this.emulationSelected = eml;
        },

        /**
         * click nút sử dụng trên tr actions
         * author:DPQuy (13/11/2022)
         * **/
        activeStatus(emu) {
            console.log(emu);
            //kiểm tra xem danh hiệu có đang ở trạng thái ngưng sử dụng ko
            //nếu có thì thực hiện cập nhật
            if (emu.Status == 0) {
                emu.Status = 1;
                var me = this;
                updateEmulation(emu).then(res => {
                    console.log(res);
                    //load lại dữ liệu
                    me.loadData();
                    //nội dung thông báo
                    this.showToast("Lưu thành công");

                }).catch(error => {
                    console.log(error);
                });
            }
        },

        /**
         * click nút ngưng sử dụng trên actions row
         * author:DPQuy (13/11/2022)
         * **/
        inactiveStatus(emu) {
            //kiểm tra xem danh hiệu có đang ở trạng thái ngưng sử dụng ko
            //nếu có thì thực hiện cập nhật
            if (emu.Status == 1) {
                emu.Status = 0;
                var me = this;
                updateEmulation(emu).then(res => {
                    console.log(res);
                    //load lại dữ liệu
                    me.loadData();
                    //nội dung thông báo
                    this.showToast("Lưu thành công");

                }).catch(error => {
                    console.log(error);
                });
            }
        },
        /**
         * khi nhập giá trị tìm kiếm
         * author:DPQuy (13/11/2022)
         * **/
        searchInput() {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                //khi txtSearch rỗng
                if (this.txtSearch == "") {
                    //load dữ liệu theo trang và số bản ghi theo filter
                    this.loadData();
                }
                else {
                    this.pageIndex = 1;
                    //khi filter rỗng thì lấy ra bản ghi theo số trang và số bản ghi
                    this.loadData();
                }
            }, 750);
        },
        /**
         * sự kiện nhấn nút enter thực hiện tìm kiếm
         * author:DPQuy (13/11/2022)
         * **/
        keydownSearch() {
            if (this.txtSearch == "") {
                //load dữ liệu theo trang và số bản ghi theo filter
                this.loadData();
            }
            else {
                this.pageIndex = 1;
                //khi filter rỗng thì lấy ra bản ghi theo số trang và số bản ghi
                this.loadData();
            }
        },
        /**
         * click checkbox all
         * author:DPQuy (13/11/2022)
         * **/
        changeCheckedAll() {

            //khi đã tích chọn bản ghi trước đó
            //thực hiện hủy select toàn bộ
            if (this.EmulationIDs.length !== 0) {
                this.isSelectAll = false;
                this.EmulationIDs = [];
                this.isShowCheckActions = false;
                return;
            }

            this.EmulationIDs = [];
            //hiển thị actions thao tác với các bản ghi checked
            this.isShowCheckActions = !this.isShowCheckActions;
            if (this.isSelectAll) {
                for (const emu in this.data) {
                    this.EmulationIDs.push(this.data[emu].EmulationID);
                }
            }
        },

        /**
         * click checkbox all
         * author: DPQuy (13/11/2022)
         * **/
        cbCheckedAll(event) {
            //hiển thị các acitons khi checkbox
            this.isShowCheckActions = !this.isShowCheckActions
            if (!this.isSelectAll && this.EmulationIDs.length !== 0) {
                this.EmulationIDs = [];
                this.isDelectAll = true;
                return;
            }

            this.EmulationIDs = [];
            if (!this.isSelectAll) {
                for (const emu in this.data) {
                    this.EmulationIDs.push(this.data[emu].EmulationID);
                }
            }
        },
        /**
         * Hàm ẩn/ hiển menu bộ lọc
         * author: DPQuy(13/11/2022)
         * **/
        showFilterBox() {
            this.isShowFilterBox = !this.isShowFilterBox;
        },

        /**
         * click dấu x trên input search
         * thực hiện clear text
         * author:DPQuy (13/11/2022)
         * **/
        clearText() {
            this.txtSearch = '';
            this.pageIndex = 1;
            this.loadData();
        },
        /**
         * click nút thêm danh hiệu
         * author: DPQuy (13/11/2022)
         * **/
        btnAddEmulation(mode, emulation) {
            //0.thêm mới
            //1.Chỉnh sửa
            if (mode == 1) {
                this.emulationSelected = emulation;
            }
            this.EditMode = mode;
            //gọi hàm thực hiện mở form chi tiết
            this.showEmulationDetail();
        },

        // /**
        //  * Mở form chi tiết danh hiệu
        //  * với chế độ chỉnh sửa
        //  * author: DPQuy (13/11/2022)
        //  * **/
        // btnEditMulation(emulation) {
        //     //set trạng thái cho form
        //     //0.Thêm mới
        //     //1.Chỉnh sửa
        //     this.EditMode = 1;
        //     //lấy ra object cần chỉnh sửa
        //     this.emulationSelected = emulation;
        //     //mở form
        //     this.showEmulationDetail();
        // },
        /**
         * click icon more khi hover
         * từng tr
         * author: DPQuy (13/11/2022)
         * **/
        showRowAction() {
            this.isShowRowAction = !this.isShowRowAction;
        },
        /**
         * sự kiện khi ko hover ra ngoài
         * tr
         * ***/
        moveleaveTr() {
            //ẩn các action trên tr
            this.isShowRowAction = false;
        },
        /**
         * Hàm show popup chi tiết danh hiệu
         * author: DPQuy (13/11/2022)
         * ***/
        showEmulationDetail() {
            this.isShowEmulationDetail = !this.isShowEmulationDetail;
            //ẩn filter box nếu đang mở
            this.isShowFilterBox = false;
        },

        /**
         * load danh sách các danh hiệu
         * author:DPQuy(13/11/2022)
         * **/
        loadData() {
            var me = this;
            this.isLoading = true;
            loadData(this.pageIndex, this.pageSize, this.txtSearch).then(res => {
                me.data = res.data;
                me.TotalPage = res.TotalPage;
                me.TotalRecord = res.TotalRecord;
                setTimeout(() => { this.isLoading = false }, 150);
                console.log(res);
            });


            // axios.get(API.loadData(1, 200, '')).then(res => {
            //     console.log(res);
            //     me.data = res.data.data;
            //     this.isLoading = false;
            // })

        }
    },

    created() {
        this.loadData();

    },
}
</script>


<style>
@import url(../css/views/emulationlist.css);
</style>