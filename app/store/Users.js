Ext.define('PatientDiary.store.Users', {
    extend: 'Ext.data.Store',
    config: {
       	model:'PatientDiary.model.User',
        autoLoad: false
      }
});