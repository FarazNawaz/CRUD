$(document).ready(function () {
    bindEvents();
    loadDataFromLocal();
  });
  
  function bindEvents() {
    $('#tblData').on('click', '.btn-edit', function () {
      editRow($(this));
    });
  
    $('#tblData').on('click', '.btn-delete', function () {
      deleteRow($(this));
    });
  
    $("#btnSave").click(function () {
      saveOrUpdateData();
    });
  
    $("#btnClear").click(function () {
      clearForm();
    });
  }
  
  function renderTableRow(index, data) {
    return `
      <tr>
        <td>${index}</td>
        <td class="txtName" data-id="${data.id}">${data.name}</td>
        <td class="txtContact">${data.contact}</td>
        <td class="txtAltNo">${data.altContact}</td>
        <td class="txtAddress">${data.address}</td>
        <td class="tdAction text-center">
          <button class="btn btn-sm btn-success btn-edit">Edit</button>
          <button class="btn btn-sm btn-danger btn-delete">Delete</button>
        </td>
      </tr>`;
  }
  
  function addEmptyRow() {
    if ($("#tblData tbody tr").length === 0) {
      $("#tblData tbody").append("<tr><td colspan='6' class='text-center'>No Records Available</td></tr>");
    }
  }
  
  function loadDataFromLocal() {
    let localData = localStorage.getItem('localData');
    if (localData) {
      const localArray = JSON.parse(localData);
      $("#tblData tbody").html("");
      
      localArray.forEach((element, index) => {
        $("#tblData tbody").append(renderTableRow(index + 1, element));
      });
    }
    addEmptyRow();
  }
  
  function clearForm() {
    $("#txtName, #txtContact, #txtAltNo, #txtAddress, #txtId").val("");
    $("#btnSave").text("Save");
  }
  
  function saveOrUpdateData() {
    if ($("#txtId").val() === '') {
      addDataToLocal();
    } else {
      updateDataFromLocal();
    }
  }
  
  function editRow(button) {
    const row = button.closest('tr');
    const name = row.find(".txtName").text();
    const contact = row.find(".txtContact").text();
    const altContact = row.find(".txtAltNo").text();
    const address = row.find(".txtAddress").text();
    const id = row.find(".txtName").data("id");
  
    $("#txtName").val(name);
    $("#txtContact").val(contact);
    $("#txtAltNo").val(altContact);
    $("#txtAddress").val(address);
    $("#txtId").val(id);
    $("#btnSave").text("Update");
  }
  
  function deleteRow(button) {
    const id = button.closest('tr').find(".txtName").data("id");
    deleteDataFromLocal(id);
  }
  
  function addDataToLocal() {
    const localData = localStorage.getItem('localData') || '[]';
    const localArray = JSON.parse(localData);
  
    const newData = {
      id: localArray.length + 1,
      name: $("#txtName").val(),
      contact: $("#txtContact").val(),
      altContact: $("#txtAltNo").val(),
      address: $("#txtAddress").val()
    };
  
    localArray.push(newData);
    localStorage.setItem('localData', JSON.stringify(localArray));
    loadDataFromLocal();
    clearForm();
  }
  
  function updateDataFromLocal() {
    const localData = localStorage.getItem('localData');
    const localArray = JSON.parse(localData);
  
    const updatedRecord = localArray.find(item => item.id == $("#txtId").val());
    if (updatedRecord) {
      updatedRecord.name = $("#txtName").val();
      updatedRecord.contact = $("#txtContact").val();
      updatedRecord.altContact = $("#txtAltNo").val();
      updatedRecord.address = $("#txtAddress").val();
      
      localStorage.setItem('localData', JSON.stringify(localArray));
      loadDataFromLocal();
      clearForm();
    }
  }
  
  function deleteDataFromLocal(id) {
    const localData = localStorage.getItem('localData');
    const localArray = JSON.parse(localData);
  
    const index = localArray.findIndex(item => item.id == id);
    if (index !== -1) {
      localArray.splice(index, 1);
      localStorage.setItem('localData', JSON.stringify(localArray));
      loadDataFromLocal();
    }
  }
  