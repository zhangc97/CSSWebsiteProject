from rest_framework.views import exception_handler

def core_exception_handler(exc, context):
    #covers all the handles that are not specified here
    response = exception_handler(exc, context)
    handlers = {
        'ProfileDoesNotExist' : _handle_generic_error,
        'ValidationError': _handle_generic_error
    }
    #^^^ which errors to handle

    exception_class = exc.__class__.__name__

    if exception_class in handlers:
        #if we can handle it, then handle it, or else use default
        return handlers[exception_class](exc, context, response)

    return response

def _handle_generic_error(exc, context, response):
    response.data = {
        'errors': response.data
    }

    return response
