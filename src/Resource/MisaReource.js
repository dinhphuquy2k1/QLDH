import { createI18n } from 'vue-i18n'
const misaResource = createI18n({
    locale: "vn",
    messages: {
        vn: {
            EditEmulationText: 'Sửa danh hiệu thi đua',
            AddEmulationText: 'Thêm danh hiệu thi đua',
            EmulationNameText: 'Tên danh hiệu thi đua',
            EmulationText: 'Danh hiệu thi đua',
            EmulationNameEmpty: 'Tên danh hiệu thi đua không được để trống',
            EmulationCodeText: 'Mã danh hiệu',
            EmulationCodeEmpty: 'Mã danh hiệu không được để trống',
            EmulationCodeDuplicate: 'Mã danh hiệu đã tồn tại trong hệ thống',
            MovementTypeEmpty: 'Loại phong trào không được để trống.',
            ApplyObjectText: 'Đối tượng khen thưởng',
            ApplyObjectEmpty: 'Đối tượng khen thưởng không được để trống.',
            CommendationLevelNameText: 'Cấp khen thưởng',
            CommendationLevelNameEmpty: 'Cấp khen thưởng không được để trống',
            MovementTypeTextApply: 'Loại phong trào áp dụng',
            MovementTypeText: 'Loại phong trào',
            NoteText: 'Ghi chú',
            FilterText: 'Bộ lọc',
            StatusText: 'Trạng thái',
            CloseText: 'Đóng',
            HelpText: 'Hướng dẫn',
            CancelText: 'Hủy',
            ApplyText: 'Áp dụng',
            SaveText: 'Lưu',
            SaveAndAddText: 'Lưu & thêm mới',
            UseText: 'Sử dụng',
            DeleteText: 'Xóa',
            StopUsingText: 'Ngưng sử dụng',
            IndividualText: 'Cá nhân',
            GroupText: 'Tập thể',
            FrequentText: 'Thường xuyên',
            BatchedText: 'Theo đợt',
            RecordText: 'Bản ghi',
            SumText: 'Tổng sổ:',
            ApplyObject: {
                Group: 'Tập thể',
                Individual: 'Cá nhân',
                GroupAndIndi: 'Tập thể và cá nhân'
            },
            MovementType: {
                Frequent: 'Thường xuyên',
                Batched: 'Theo đợt',
                FreAndBat: 'Thường xuyên, theo đợt'
            }
        },
    }
})

export default misaResource