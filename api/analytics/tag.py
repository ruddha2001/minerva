import pandas as pd
import matplotlib as mpl
import matplotlib.pyplot as plt
from pandas import DataFrame

def down():

   dv = cs.sort_values(["downvotes"], axis=0,
                 ascending=False)
   del dv['class_code']
   del dv['unit_number']
   del dv['answered']
   del dv['upvotes']
   my2 = dv.to_json()
   print(my2)



def up():
    dx = cs.sort_values(["upvotes"], axis=0,
                     ascending=False)
    del dx['class_code']
    del dx['unit_number']
    del dx['answered']
    del dx['downvotes']
    my3 = dx.to_json()
    print(my3)

def answer():
    vx = cs['answered'].value_counts()
    b = vx.to_frame('answered')
    lx = pd.DataFrame(b).reset_index()
    lx.rename(columns={'answered':'Count', 'index':'answered'}, inplace=True )
    my4 = lx.to_json()
    print(my4)

def unit():
   vd = cs['unit_number'].value_counts()
   s = vd.to_frame('Tag_name')
   df = pd.DataFrame(s).reset_index()
   df.rename(columns={'Tag_name':'Count', 'index':'Tag_Name'}, inplace=True )
   df.head()
   my = df.to_json()
   print(my)


def main():
   import argparse
   parser = argparse.ArgumentParser(description='Give filename.csv and flag')
   parser.add_argument('-file', action="store", dest="file_name")
   parser.add_argument('-op', action="store", dest="output_name")
   args = parser.parse_args()
   file_name = args.file_name
   output_name = args.output_name
   global cs
   cs = pd.read_csv(file_name)
   if(output_name=='u' or output_name=='unit'):
       unit()
   elif(output_name=='d' or output_name=='down'):
       down()
   elif(output_name=='up'):
       up()
   elif(output_name=='a' or output_name == "ans"):
       answer()

if __name__ == "__main__":
   main()
