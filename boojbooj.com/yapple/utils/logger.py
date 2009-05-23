import logging

log = None

def getLogger():
    #print "%s.getLogger()" % __name__
    #logging.basicConfig()
    log = logging.getLogger(__name__)
    log.setLevel(logging.DEBUG)
    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG)
    formatter = logging.Formatter("[%(asctime)s] %(levelname)s: %(module)s,%(lineno)d - %(message)s")
    ch.setFormatter(formatter)
    if len(log.handlers) < 1:
        log.addHandler(ch)

    return log

if log is None:
    log = getLogger()
    