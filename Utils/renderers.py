import json

from rest_framework.renderers import JSONRenderer


class UtilJSONRenderer(JSONRenderer):
    charset = 'utf-8'
    object_label = 'object'

    def render(self, data, media_type=None, renderer_context=None):
        errors = data.get('errors', None) #throws an error is user is not IsAuthenticated

        if errors is not None:
            return super(UtilJSONRenderer, self).render(data)

        return json.dumps({
            self.object_label: data
        })
