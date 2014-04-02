Ext.define('PatientDiary.store.Systems', {
    extend: 'Ext.data.Store',
    config: {
        model: 'PatientDiary.model.System',
        autoLoad:false,
        autoSync:false
    }
});