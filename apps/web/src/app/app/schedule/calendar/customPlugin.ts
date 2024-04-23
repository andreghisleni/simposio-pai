import { createPlugin, sliceEvents } from '@fullcalendar/core'

const CustomViewConfig = {
  classNames: ['border border-border'],

  content: function (props) {
    const segs = sliceEvents(props, true) // allDay=true
    const html =
      '<div class="flex gap-2 p-4">' +
      props.dateProfile.currentRange.start.toUTCString() +
      '</div>' +
      '<div class="view-events">' +
      segs.length +
      ' events' +
      '</div>'

    return { html }
  },

  didMount: function (props) {
    console.log('custom view now loaded')
  },

  willUnmount: function (props) {
    console.log('about to change away from custom view')
  },
}

export const customPlugin = createPlugin({
  name: 'custom',
  views: {
    custom: CustomViewConfig,
  },
})
