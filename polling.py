import os, csv

def get_status():
    stream = os.popen("nvidia-smi --query-gpu=timestamp,name,pci.bus_id,driver_version,pstate,pcie.link.gen.max,pcie.link.gen.current,temperature.gpu,utilization.gpu,utilization.memory,memory.total,memory.free,memory.used --format=csv")

    data = csv.DictReader(stream)

    return [{k.strip(): v.replace("%","").strip() for k,v in row.items()} for row in data]