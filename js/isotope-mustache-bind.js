var SELECTED_DAY = 7;
var selectDay = null;
var showIsotope = function(containerId, templateId, view){

    template = $(templateId).html();
    Mustache.parse(template);

    container = $(containerId);

    selectDay = function(day) {
      SELECTED_DAY = day;
      for (var i=7;i<=14; i++) {
        $('.day' + i).removeClass("active");
      }
      $('.day' + SELECTED_DAY).addClass("active");
      first = "SÁBADO, 7 de Outubro";
      sunday = "DOMINGO, 8 de Outubro";
      monday = "SEGUNDA, 9 de Outubro";
      tuesday = "TERÇA, 10 de Outubro";
      wednesday = "QUARTA, 11 de Outubro";
      thursday = "QUINTA, 12 de Outubro";
      friday = "SEXTA, 13 de Outubro";
      saturday = "SÁBADO, 14 de Outubro";
      $(containerId).isotope('updateSortData').isotope();
      $('.date-summary').text(Mustache.render(
        "{{#first}}" + first + "{{/first}}" +
        "{{#sunday}}" + sunday + "{{/sunday}}" +
        "{{#monday}}" + monday + "{{/monday}}" +
        "{{#tuesday}}" + tuesday + "{{/tuesday}}" +
        "{{#wednesday}}" + wednesday + "{{/wednesday}}" +
        "{{#thursday}}" + thursday + "{{/thursday}}" +
        "{{#friday}}" + friday + "{{/friday}}" +
        "{{#saturday}}" + saturday + "{{/saturday}}",
        {
          first: SELECTED_DAY == 7,
          sunday: SELECTED_DAY == 8,
          monday: SELECTED_DAY == 9,
          tuesday: SELECTED_DAY == 10,
          wednesday: SELECTED_DAY == 11,
          thursday: SELECTED_DAY == 12,
          friday: SELECTED_DAY == 13,
          saturday: SELECTED_DAY == 14
        }
      ));
    };

    container.html(Mustache.render(template, view));

    $(containerId).isotope({
      itemSelector: '.isotope-item',
      filter: function() {
        return parseFloat($(this).attr('data-date')) == SELECTED_DAY;
      },
      getSortData: {
        priority: function(itemElem){
          date = parseFloat($(itemElem).attr('data-date'));
          time = parseFloat($(itemElem).attr('data-time'));
          return date * 100 + time;
        }
      },
      sortBy: 'priority',
      sortAscending: {
        priority: true
      },
      layoutMode: 'vertical',
      animationEngine: 'best-available'
    });
}

$(window.document).ready(function(){
    if ( typeof _isotopeRoot !== "undefined" ){
        showIsotope(_isotopeRoot, _isotopeTemplate, _isotopeView);
        window.setTimeout(function(){
          today = new Date();
          day = today.getDate();
          month = today.getMonth()+1;
          year = today.getFullYear();
          if (year <= 2017 && ((month == 10 && day <= 7) || month < 10)) {
            selectDay(7);
          } else if (year >= 2017 && ((month == 10 && day >= 14) || month > 10)) {
            selectDay(14);
          } else {
            selectDay(day);
          }
        }, 300);
    }
});
