/** 全局js代码 */
$(function () {
  var TAB_INDEX_KEY = 'tabindex';
  var addTodayBillTypeLabelBar = $('#addTodayBillTypeLabelBar');
  var billTypeLabels = addTodayBillTypeLabelBar.find('span');

  var moneyElm = $('#money');
  var countElm = $('#count');
  var totalElm = $('#total');
  var nameElm = $('#name');
  var autoSumTotal = $('#autoSumTotal')[0].checked;

  function closeBillType() {
    var tabindex = $(this).attr(TAB_INDEX_KEY);
    var billType = Number(tabindex.split('-')[0]);

    addTodayBillTypeLabelBar.attr(TAB_INDEX_KEY, tabindex);
    billTypeLabels.eq(0).text($(this).text());
    billTypeLabels.eq(1).text($('.dropdown-header').eq(billType).text());

    if (billType === 0) {
      billTypeLabels.removeClass('label-warning').addClass('label-info');
    } else {
      billTypeLabels.removeClass('label-info').addClass('label-warning');
    }
  }

  function addCloseBillTypeClick(index, elm) {
    $(elm).on('click', closeBillType);
  }

  function changeAutoSumTotal() {
    autoSumTotal = $(this)[0].checked;
    if (autoSumTotal) {
      totalElm.attr('disabled', true);
      sumMoney();
    } else {
      totalElm.attr('disabled', false);
    }
  }

  function sumMoney() {
    if (autoSumTotal) {
      var money = Number(moneyElm.val());
      var count = Number(countElm.val());

      if (money && count) {
        totalElm.val(count * money);
      }
    }
  }

  function formNumberDataValidation(number, msg, id) {
    if (!number) {
      layer.tips(msg, id, { tips: 1, tipsMore: true });
      return false;
    } else {
      return true;
    }
  }

  function formValidation(name, money, count, total) {
    var nameIsOk = false;
    var moneyIsOk = formNumberDataValidation(money, '请输入单价', '#money');
    var countIsOk = formNumberDataValidation(count, '请输入数量', '#count');
    var totalIsOk = false;

    if (name.length === 0) {
      layer.tips('请输入名称', '#name', { tips: 1, tipsMore: true });
    } else if (name.length < 2) {
      layer.tips('请输入有效名称', '#name', { tips: 1, tipsMore: true });
    } else {
      nameIsOk = true;
    }

    if (autoSumTotal) {
      totalIsOk = true;
    } else {
      totalIsOk = formNumberDataValidation(total, '请输入总金额', '#total');
    }

    if (nameIsOk && moneyIsOk && countIsOk && totalIsOk) {
      return true;
    } else {
      return false;
    }
  }

  function submit(event) {
    event.preventDefault();

    var name = nameElm.val();
    var money = Number(moneyElm.val());
    var count = Number(countElm.val());
    var total = Number(totalElm.val());

    if (formValidation(name, money, count, total)) {
      var billTypeName = billTypeLabels.eq(1).text();
      var billType = Number(
        addTodayBillTypeLabelBar.attr(TAB_INDEX_KEY).split('-')[0]
      );
      var postData = {
        name: name,
        money: money,
        count: count,
        total: total,
        type: {
          type: billType,
          name: billTypeName,
        },
      };

      $.ajax({
        url: '/post',
        type: 'POST',
        data: postData,
        beforeSend: function () {
          layer.load(1);
        },
        success: function (res) {
          var tr;
          var data = res.data;

          if ($('#billTable tbody tr').length) {
            tr = $('#billTable tbody tr').eq(0).clone();
          } else {
            var td = $(document.createElement('td'));
            tr = $(document.createElement('tr'));
            tr.append(
              td.clone(),
              td.clone(),
              td.clone(),
              td.clone(),
              td.clone()
            );
          }

          if (data.type.type === '1') {
            tr.find('td').eq(0).addClass('warning');
          } else {
            tr.find('td').eq(0).addClass('info');
          }

          tr.find('td').eq(0).text(data.type.name);
          tr.find('td').eq(1).text(data.name);
          tr.find('td').eq(2).text(data.money);
          tr.find('td').eq(3).text(data.count);
          tr.find('td').eq(4).text(data.total);
          $('#billTable tbody').append(tr);
          layer.closeAll();
        },
        error: function (error) {
          layer.closeAll();
          layer.msg(error.message);
          console.log(error);
        },
      });
    }
  }

  $('.dropdown-menu a').each(addCloseBillTypeClick);
  moneyElm.on('input', sumMoney);
  countElm.on('input', sumMoney);
  $('#autoSumTotal').on('change', changeAutoSumTotal);
  $('#submit').on('click', submit);
});
