import json
from Utils.renderers import UtilJSONRenderer

class UserJSONRenderer(UtilJSONRenderer):
    object_label = 'label'

    def render(self, data, media_type=None, renderer_context=None):
        #token comes in bytes so we have to decode
        token = data.get('token', None)
        #error handling:
        errors = data.get('errors', None)
        if errors is not None:
            return super(UserJSONRenderer, self).render(data)
        if token is not None and isinstance(token, bytes):
            data['token'] = token.decode('utf-8')

        return json.dumps({
            'user': data
        })
        return super(UserJSONRenderer, self).render(data)
